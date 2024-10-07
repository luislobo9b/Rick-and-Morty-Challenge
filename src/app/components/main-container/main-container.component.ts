import { Component, HostListener, OnInit } from '@angular/core'
import { RickAndMortyApiService } from './../../services/rick-and-morty-api/rick-and-morty-api.service'
import { Subject, Subscription, debounceTime } from 'rxjs'

import {
  IRickAndMortyCharactersResult
} from '../../interfaces/IRickAndMortyApi'

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {
  rickAndMortyCharactersResult:IRickAndMortyCharactersResult = {
    allCharacters: [],
    hasNextPage: false
  }

  scrollSubject = new Subject<Event>()
  subscription: Subscription

  constructor(private rickAndMortyApiService:RickAndMortyApiService) {
    this.subscription = this.scrollSubject.pipe(
      debounceTime(300)
    ).subscribe(event => {
    })
  }

  @HostListener('window:scroll', ['$event'])
  handleWindowScroll(event:Event): void {
    this.scrollSubject.next(event)
  }

  ngOnInit(): void {
    this.rickAndMortyApiService.characters$.subscribe(result => {
      this.rickAndMortyCharactersResult = result
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
