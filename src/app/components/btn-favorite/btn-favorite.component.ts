import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription, Observable } from 'rxjs'

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
  favorites$!: Observable<number[]>

  favoritesSubscription!: Subscription

  @Input()
  characterId!: number

  isFavorited!: boolean

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.favoritesSubscription = this.favorites$.subscribe(favorites => {
      this.isFavorited = favorites.includes(this.characterId)
    })
  }

  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe()
  }

  removeFavorite() {
    this.store.dispatch(new RemoveFavorite(this.characterId))
  }

  addFavorite() {
    this.store.dispatch(new AddFavorite(this.characterId))
  }
}
