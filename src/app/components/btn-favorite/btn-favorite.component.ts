import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription, Observable } from 'rxjs'
import { ICharacter } from 'src/app/interfaces/IRickAndMortyApi'

// ngxs
import { Select, Store } from '@ngxs/store'
import { RemoveFavorite, AddFavorite } from '../../states/favorites/favorites.actions'
import { FavoritesState } from '../../states/favorites/favorites.state'

@Component({
  selector: 'app-btn-favorite',
  templateUrl: './btn-favorite.component.html',
  styleUrls: ['./btn-favorite.component.scss']
})
export class BtnFavoriteComponent implements OnDestroy, OnInit {
  @Select(FavoritesState.getFavorites)
  favorites$!: Observable<ICharacter[]>

  favoritesSubscription!: Subscription

  @Input()
  currentCharacter!: ICharacter

  isFavorited!: boolean

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.favoritesSubscription = this.favorites$.subscribe(favorites => {
      this.isFavorited = favorites.includes(this.currentCharacter)
    })
  }

  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe()
  }

  removeFavorite() {
    this.store.dispatch(new RemoveFavorite(this.currentCharacter))
  }

  addFavorite() {
    this.store.dispatch(new AddFavorite(this.currentCharacter))
  }
}
