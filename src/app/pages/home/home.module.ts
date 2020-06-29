import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
  ],
  declarations: [
    HomeComponent,
  ],
  exports: [
    HomeComponent,
  ],
})
export class HomeModule { }
