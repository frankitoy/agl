import {
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Pet } from '../constants/pet.enum';
import { Application } from '../models/application.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(applications: Array<Application>): any {
    return applications.filter(application => !!application.pets && application.pets.some(pet => pet.type === Pet.CAT));
  }
}
