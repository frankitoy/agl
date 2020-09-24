import {
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationService } from './services/application.service';
import { ApplicationEffects } from './store/application.effects';
import { applicationReducer } from './store/application.reducer';
import { applicationFeatureKey } from './store/application.selectors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    // external - store
    StoreModule.forRoot({
      [applicationFeatureKey]: applicationReducer,
    }),
    EffectsModule.forRoot([ApplicationEffects]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
  ],
  providers: [ApplicationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
