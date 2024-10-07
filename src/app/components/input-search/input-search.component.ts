import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, catchError, debounceTime, distinctUntilChanged, map, of, switchMap, shareReplay, first } from 'rxjs';
import { RickAndMortyApiService } from 'src/app/services/rick-and-morty-api/rick-and-morty-api.service';

import {
  IRelevance
} from '../../interfaces/IRickAndMortyApi';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {
  searchControl = new FormControl()
  inputName = ""
  showAutocomplete = false

  constructor(private rickAndMortyApiService: RickAndMortyApiService) {}

  filteredNames!: Observable<string[]>

  handleKeyDown($event:KeyboardEvent): void {
    if (/^(Tab|Enter)$/.test($event.key)) {
      $event.preventDefault()

      this.filteredNames.pipe(first()).subscribe(names => {
        if (names.length && names[0].length) {
          this.inputName = names[0]
        }
      })
    }
  }

  handleInput(): void {
    this.showAutocomplete = this.inputName.length !== 0
  }

  handleAutocomplete(value: string): void {
    this.inputName = value
    this.showAutocomplete = false
  }

  hiddenAutocomplete() {
    const ulAutocomplete = document.querySelector(".ul-autocomplete")

    if (!(ulAutocomplete && ulAutocomplete.matches(":hover, :focus"))) {
      this.showAutocomplete = false
    }
  }

  ngOnInit(): void {
    const shareValueChanges$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      shareReplay()
    )

    this.filteredNames = shareValueChanges$.pipe(
      switchMap(name => {
        return this.rickAndMortyApiService.getRickAndMortyCharacterNames(name)
      }),
      map((names: string[]) => {
        return this.sortByRelevance(this.filterNames(names))
      }),
      catchError(error => {
        console.error(error)
        return of([])
      })
    )

    this.filteredNames.subscribe()

    shareValueChanges$.pipe(
      switchMap(name => {
        return this.rickAndMortyApiService.getRickAndMortyCharacters(name)
      }),
      catchError(error => {
        console.error(error)
        return of([])
      })
    ).subscribe()
  }

  sortByRelevance(names:string[]):string[] {
    const namesAndRelevance:IRelevance[] = names.map(name => {
      return {
        name,
        relevance: this.calcRelevance(name)
      }
    })
    return namesAndRelevance.sort(({relevance: a}, {relevance: b}) => {
      return a > b ? -1 : a === b ? 0 : 1
    }).map(item => item.name)
  }

  calcRelevance(name:string): number {
    let relevance = 0

    for(let i = 0; i < this.inputName.length; i++) {
      const currentCharacter = this.inputName[i].toLowerCase()

      if (currentCharacter === name[i].toLowerCase()) {
        relevance++
      } else {
        break
      }
    }

    return relevance
  }

  filterNames(names: string[]) {
    return names.filter(name => {
      return name.toLowerCase().includes(this.inputName.toLowerCase())
    })
  }
}
