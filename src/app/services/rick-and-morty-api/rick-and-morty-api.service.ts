import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable, catchError, of, finalize, first } from 'rxjs'

import {
  IRickAndMortyApiCharactersResponse,
  ICharacter,
  IRickAndMortyCharactersNames,
  IRickAndMortyCharactersResult
} from '../../interfaces/IRickAndMortyApi'

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyApiService {
  apiRestUrl = 'https://rickandmortyapi.com/api/character'
  apiGraphqlUrl = 'https://rickandmortyapi.com/graphql'

  names:string[] = []
  lastSearchlastNameSearched:string = ''

  private loadingNextPageSubject = new BehaviorSubject<boolean>(false)
  loadingNextPage$ = this.loadingNextPageSubject.asObservable()

  rickAndMortyCharactersResult:IRickAndMortyCharactersResult = {
    allCharacters: [],
    hasNextPage: false,
    loadingNextPage: this.loadingNextPageSubject
  }

  private charactersSubject = new BehaviorSubject<IRickAndMortyCharactersResult>(this.rickAndMortyCharactersResult)
  characters$ = this.charactersSubject.asObservable()

  constructor(private http: HttpClient) {}

  private currentPage = 1

  handlePagination(componentLoadNextPage = false): Observable<boolean> {
    const loadingNextPage = this.loadingNextPageSubject.getValue()

    if (componentLoadNextPage && !loadingNextPage) {
      this.currentPage++
      this.getRickAndMortyCharacters(this.lastSearchlastNameSearched, this.currentPage).pipe(first()).subscribe()
    }
    return of(componentLoadNextPage)
  }

  getRickAndMortyCharacters(name: string = '', page = 1): Observable<IRickAndMortyCharactersResult> {
    const loadingNextPage = this.loadingNextPageSubject.getValue()

    if (loadingNextPage) {
      this.charactersSubject.next(this.rickAndMortyCharactersResult)
      return of(this.rickAndMortyCharactersResult)
    }
    this.loadingNextPageSubject.next(true)

    // infinite scroll
    if (this.lastSearchlastNameSearched !== name) { // reset allCharacters
      this.rickAndMortyCharactersResult.allCharacters = []
      this.lastSearchlastNameSearched = name
      page = 1
      this.currentPage = 1
    }

    const searchByName = name !== '',
      params:{page:number, name?:string} = {
        page
      }

    if (searchByName) {
      params.name = name
    }

    return this.http.get<IRickAndMortyApiCharactersResponse>(this.apiRestUrl, { params }).pipe(
      map((response:IRickAndMortyApiCharactersResponse): IRickAndMortyCharactersResult => {
        this.rickAndMortyCharactersResult.allCharacters = this.removeDuplicateCharacters(
          [...this.rickAndMortyCharactersResult.allCharacters, ...response.results]
        )
        // infinite scroll
        this.rickAndMortyCharactersResult.hasNextPage = typeof(response?.info?.next) === 'string'

        return this.rickAndMortyCharactersResult
      }),
      catchError((ResponseError:{error: string}):Observable<IRickAndMortyCharactersResult> => {
        const { error } = ResponseError
        if (ResponseError.error !== 'There is nothing here') {
          console.error(error)
        }

        this.rickAndMortyCharactersResult.allCharacters = []
        return of(this.rickAndMortyCharactersResult)
      }),
      finalize(() => {
        this.loadingNextPageSubject.next(false)
        this.charactersSubject.next(this.rickAndMortyCharactersResult)
        return of(this.rickAndMortyCharactersResult)
      })
    )
  }

  getRickAndMortyCharacterNames(name:string): Observable<string[]> {
    const bodyReq = {
      query: `
        query {
          characters(filter: { name: "${name}" }) {
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
