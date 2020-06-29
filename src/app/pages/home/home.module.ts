import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { FilterPetsPipe } from 'src/app/pipes/filter-pets.pipe';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    FilterPipe,
    FilterPetsPipe,
  ],
  exports: [
    HomeComponent,
    FilterPipe,
    FilterPetsPipe,
  ],
})
export class HomeModule { }
