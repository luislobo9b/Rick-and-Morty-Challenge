import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// angular-material
import { MatIconModule } from '@angular/material/icon'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

// ngxs
import { NgxsModule } from '@ngxs/store'
import { FavoritesState } from './states/favorites/favorites.state'

import { HomeComponent } from './pages/home/home.component'
import { FavoritesComponent } from './pages/favorites/favorites.component'
import { HeaderComponent } from './components/header/header.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { InputSearchComponent } from './components/input-search/input-search.component'
import { MainContainerComponent } from './components/main-container/main-container.component'
import { BtnFavoriteComponent } from './components/btn-favorite/btn-favorite.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    HeaderComponent,
    NavbarComponent,
    InputSearchComponent,
    MainContainerComponent,
    BtnFavoriteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // ngxs
    NgxsModule.forRoot([
      FavoritesState
    ]),

    // angular-material
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
