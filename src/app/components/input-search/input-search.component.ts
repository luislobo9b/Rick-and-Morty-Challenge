import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {
  searchControl = new FormControl()
  inputName = ""
  showAutocomplete = true
  names = [
  	"Rick Sanchez",
  	"Morty Smith",
  	"Summer Smith",
  	"Beth Smith",
  	"Jerry Smith",
  	"Abadango Cluster Princess",
  	"Abradolf Lincler",
  	"Adjudicator Rick",
  	"Agency Director",
  	"Alan Rails",
  	"Albert Einstein",
  	"Alexander",
  	"Alien Googah",
  	"Alien Morty",
  	"Alien Rick",
  	"Amish Cyborg",
  	"Annie",
  	"Antenna Morty",
  	"Antenna Rick",
  	"Ants in my Eyes Johnson"
  ].sort()

  filteredNames!: Observable<string[]>

  filterNames(value: string) {
    const filterName = value.toLowerCase()

    if (filterName === "") {
      return []
    }

    return this.names.filter(name => {
        const nameLowerCase = name.toLocaleLowerCase()
        return nameLowerCase.startsWith(filterName) && nameLowerCase !== filterName
      })
  }

  handleInput(): void {
    this.showAutocomplete = true
  }

  handleAutocomplete(value: string): void {
    this.inputName = value
    this.showAutocomplete = false
  }

  ngOnInit(): void {
    this.filteredNames = this.searchControl.valueChanges.pipe(
      map(name => this.filterNames(name)),
      catchError(error => {
        console.error(error)
        return of([])
      })
    )
  }
}
