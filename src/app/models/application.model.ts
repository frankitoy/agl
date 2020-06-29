import { Pet } from './pets.model';

export interface Application {
  name: string;
  gender: string;
  age: number;
  pets: Pet[];
}

