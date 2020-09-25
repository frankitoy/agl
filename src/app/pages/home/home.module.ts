import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPetsPipe } from 'src/app/pipes/filter-pets.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [FilterPipe, FilterPetsPipe, HomeComponent],
  exports: [FilterPipe, FilterPetsPipe, HomeComponent],
})
export class HomeModule {}
