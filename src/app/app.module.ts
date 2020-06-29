import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  routerReducer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
