import { Component } from '@angular/core';

import {
  IRickAndMortyApiCharactersResponse,
  IInfo,
  ICharacter
} from '../../interfaces/IRickAndMortyApi';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent {
  results = []
}
