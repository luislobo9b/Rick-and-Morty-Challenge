import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'

// ngxs
import { Select, Store } from '@ngxs/store'
import { FavoritesState } from '../../states/favorites/favorites.state'

import { ICharacter } from '../../interfaces/IRickAndMortyApi'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy, OnInit {
  @Select(FavoritesState.getFavorites)
  favorites$!: Observable<ICharacter[]>
  favoritedCharacters!: ICharacter[]

  favoritesSubscription!: Subscription

  constructor(store: Store) { }

  ngOnInit(): void {
    this.favoritesSubscription = this.favorites$.subscribe((favorites:ICharacter[]) => {
      this.favoritedCharacters = favorites
    })
  }

  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe()
  }
}
