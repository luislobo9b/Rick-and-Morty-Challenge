import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, map, Observable, catchError, of } from 'rxjs';

import {
  IRickAndMortyApiCharactersResponse,
  IInfo,
  ICharacter,
  IRickAndMortyCharactersNames
} from '../../interfaces/IRickAndMortyApi';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyApiService {
  apiRestUrl = 'https://rickandmortyapi.com/api/character'
  apiGraphqlUrl = 'https://rickandmortyapi.com/graphql'

  names:string[] = []
  lastSearch:string = ""

  charactersSubject = new Subject<ICharacter[]>()
  characters$ = this.charactersSubject.asObservable()
  allCharacters:ICharacter[] = []

  constructor(private http: HttpClient) {}

  getRickAndMortyCharacters(name: string = ''): Observable<ICharacter[]> {
    if (this.lastSearch !== name) { // reset allCharacters
      this.allCharacters = []
      this.lastSearch = name
    }
    const searchByName = name !== ''

    return this.http.get<IRickAndMortyApiCharactersResponse>(
      this.apiRestUrl + (searchByName ? `?name=${encodeURI(name)}` : '')
    ).pipe(
      map((response:IRickAndMortyApiCharactersResponse): ICharacter[] => {
        this.allCharacters = this.removeDuplicateCharacters([...this.allCharacters, ...response.results])
        this.charactersSubject.next(this.allCharacters)
        return this.allCharacters
      }),
      catchError((ResponseError:{error: string}) => {
        const { error } = ResponseError
        if (ResponseError.error !== "There is nothing here") {
          console.error(error)
        }

        this.allCharacters = []
        this.charactersSubject.next(this.allCharacters)
        return of(this.allCharacters)
      })
    )
  }

  getRickAndMortyCharacterNames(name:string): Observable<string[]> {
    const bodyReq = {
      query: `
        query {
          characters(filter: { name: "${encodeURIComponent(name)}" }) {
            results {
              name
            }
          }
        }
      `
    }

    return this.http.post<IRickAndMortyCharactersNames>(this.apiGraphqlUrl, bodyReq).pipe(
      map((response:IRickAndMortyCharactersNames): string[] => {
        if (response?.data?.characters?.results.length > 0) {
          const { results } = response?.data?.characters,
            resultNames = results.map(character => character.name)

          return this.names = this.removeDuplicateCharacterNames(resultNames).sort()
        }

        return []
      })
    )
  }

  removeDuplicateCharacterNames(names:string[]): string[] {
    return [...new Set(names)]
  }

  removeDuplicateCharacters(character:ICharacter[]): ICharacter[] {
    const names:string[] = [],
      filteredcharacters:ICharacter[] = []

    character.forEach((character:ICharacter) => {
      const { name } = character

      if (!names.includes(name)) {
        names.push(name)
        filteredcharacters.push(character)
      }
    })

    return filteredcharacters
  }
}
