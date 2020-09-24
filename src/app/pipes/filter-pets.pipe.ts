import {
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Pet } from '../constants/pet.enum';
import { Pet as PetType } from '../models/pets.model';

@Pipe({
  name: 'filterPets',
})
export class FilterPetsPipe implements PipeTransform {
  transform(pets: Array<PetType>): any {
    return pets.filter(pet => pet.type === Pet.CAT).sort((a, b) => a.name.localeCompare(b.name));
  }
}
