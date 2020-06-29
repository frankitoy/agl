import { Pet as PetType } from '../constants/pet.enum';

export interface Pet {
  name: string;
  type: PetType;
}
