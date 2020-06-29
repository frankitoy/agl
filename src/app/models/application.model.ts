import { Gender } from '../constants/gender.enum';
import { Pet } from './pets.model';

export interface Application {
  age: number;
  gender: Gender;
  name: string;
  pets: Pet[];
}

