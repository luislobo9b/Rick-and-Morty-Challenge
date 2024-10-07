import { Component, OnInit } from '@angular/core'
import { RickAndMortyApiService } from './../../services/rick-and-morty-api/rick-and-morty-api.service'

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

  constructor(private rickAndMortyApiService:RickAndMortyApiService) {}

  ngOnInit(): void {
    this.rickAndMortyApiService.characters$.subscribe(result => {
      this.rickAndMortyCharactersResult = result
    })
  }
}
