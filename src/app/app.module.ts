import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {SearcherComponent} from './searcher/searcher.component';
import {PlacesComponent} from './places/places.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearcherComponent,
    PlacesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
