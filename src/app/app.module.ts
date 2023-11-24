import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuperheroListComponent } from './superhero/component/list/superhero-list.component';
import { SuperheroModule } from './superhero/superhero.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SuperheroModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
