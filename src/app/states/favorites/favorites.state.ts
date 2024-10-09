import { Injectable } from '@angular/core'

// ngxs
import { State, Action, StateContext, Selector } from '@ngxs/store'
import { RemoveFavorite, AddFavorite } from './favorites.actions'
import { IFavoritesStateModel } from '../../interfaces/favorites'

import { ICharacter } from 'src/app/interfaces/IRickAndMortyApi'

@State<IFavoritesStateModel>({
  name: 'favoritesState',
  defaults: {
    favorites: []
  }
})

@Injectable()
export class FavoritesState {
  @Selector()
  static getFavorites(state: IFavoritesStateModel) {
    return state.favorites
  }

  @Action(RemoveFavorite)
  removeFavorite(ctx: StateContext<IFavoritesStateModel>, action: RemoveFavorite) {
    const state = ctx.getState(),
      filteredFavorites = state.favorites.filter((character:ICharacter) => {
        return character.id !== action.character.id
      })

    ctx.setState({
      ...state,
      favorites: filteredFavorites
    })
  }

  @Action(AddFavorite)
  addFavorite(ctx: StateContext<IFavoritesStateModel>, action: AddFavorite) {
    const state = ctx.getState(),
      favorites = [...state.favorites, action.character]

    ctx.setState({
      ...state,
      favorites
    })
  }
}
