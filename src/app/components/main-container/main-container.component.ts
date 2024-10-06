import { Component, OnInit } from '@angular/core';
import { RickAndMortyApiService } from './../../services/rick-and-morty-api/rick-and-morty-api.service';

import {
  ICharacter
} from '../../interfaces/IRickAndMortyApi';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {
  characters:ICharacter[] = []

  constructor(private rickAndMortyApiService:RickAndMortyApiService) {}

  ngOnInit(): void {
    this.rickAndMortyApiService.characters$.subscribe(characters => {
      this.characters = characters
    })
  }
}
