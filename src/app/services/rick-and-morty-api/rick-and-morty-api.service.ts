import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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
  apiGraphqlUrl = 'https://rickandmortyapi.com/graphql'

  names:string[] = []

  constructor(private http: HttpClient) {}

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
}
