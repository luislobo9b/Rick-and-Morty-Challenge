export class RemoveFavorite {
  static readonly type = '[Favorites] Remove Favorite'

  constructor(public id: number) {}
}

export class AddFavorite {
  static readonly type = '[Favorites] Add Favorite'

  constructor(public id: number) {}
}
