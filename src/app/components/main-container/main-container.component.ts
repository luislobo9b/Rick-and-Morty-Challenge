import { Component, HostListener, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Subject, Subscription, debounceTime, first } from 'rxjs'
import { RickAndMortyApiService } from './../../services/rick-and-morty-api/rick-and-morty-api.service'

import {
  IRickAndMortyCharactersResult
} from '../../interfaces/IRickAndMortyApi'

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnDestroy, OnInit {
  rickAndMortyCharactersResult:IRickAndMortyCharactersResult = {
    allCharacters: [],
    hasNextPage: false,
    loadingNextPage: new BehaviorSubject<boolean>(false)
  }

  scrollSubject = new Subject<Event>()
  scrollSubscription!: Subscription

  constructor(private router: Router, private rickAndMortyApiService:RickAndMortyApiService) { }

  routeIsActive(route: string): boolean {
    const path = this.router.url.replace(/(#|\?)(.+)?/, '')
    return path === route
  }

  isAlmostAtPageEnd (): boolean {
    const characters = [...document.querySelectorAll(".character-img-container")]

    if (characters.length) {
      const lastCharacter = characters.at(-1)!,
        { height, top } = lastCharacter.getBoundingClientRect(),
        distance = top - window.innerHeight

      // infinite scroll
      if (distance - (height * 4) < 0) {
        return true
      }
    }

    return false
  }

  @HostListener('window:scroll', ['$event'])
  handleWindowScroll(event:Event): void {
    this.scrollSubject.next(event)
  }

  ngOnInit(): void {
    this.scrollSubscription = this.scrollSubject.pipe(
      debounceTime(300)
    ).subscribe(() => {
      if (this.isAlmostAtPageEnd()) {
        this.rickAndMortyApiService.handlePagination(
          this.rickAndMortyCharactersResult.hasNextPage
        ).pipe(
          first()
        ).subscribe()
      }
    })

    this.rickAndMortyApiService.characters$.subscribe(result => {
      this.rickAndMortyCharactersResult = result
    })

    this.rickAndMortyApiService.loadingNextPage$.subscribe()
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe()
  }
}
