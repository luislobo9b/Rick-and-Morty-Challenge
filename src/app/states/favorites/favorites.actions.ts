import { ICharacter } from "src/app/interfaces/IRickAndMortyApi"

export class RemoveFavorite {
  static readonly type = '[Favorites] Remove Favorite'

  constructor(public character: ICharacter) {}
}

export class AddFavorite {
  static readonly type = '[Favorites] Add Favorite'

  constructor(public character: ICharacter) {}
}
