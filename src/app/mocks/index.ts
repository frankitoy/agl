import { Gender } from '../constants/gender.enum';
import { Pet } from '../constants/pet.enum';

const mockApplication = [
  {
    name: 'Bob',
    gender: Gender.MALE,
    age: 23,
    pets: [
      {
        name: 'Garfield',
        type: Pet.CAT,
      },
      {
        name: 'Fido',
        type: Pet.DOG,
      },
    ],
  },
  {
    name: 'Jennifer',
    gender: Gender.FEMALE,
    age: 18,
    pets: [
      {
        name: 'Garfield',
        type: Pet.CAT,
      },
    ],
  },
  {
    name: 'Steve',
    gender: Gender.MALE,
    age: 45,
    pets: null,
  },
  {
    name: 'Fred',
    gender: Gender.MALE,
    age: 40,
    pets: [
      {
        name: 'Tom',
        type: Pet.CAT,
      },
      {
        name: 'Max',
        type: Pet.CAT,
      },
      {
        name: 'Sam',
        type: Pet.DOG,
      },
      {
        name: 'Jim',
        type: Pet.CAT,
      },
    ],
  },
  {
    name: 'Samantha',
    gender: Gender.FEMALE,
    age: 40,
    pets: [
      {
        name: 'Tabby',
        type: Pet.CAT,
      },
    ],
  },
  {
    name: 'Alice',
    gender: Gender.FEMALE,
    age: 64,
    pets: [
      {
        name: 'Simba',
        type: Pet.CAT,
      },
      {
        name: 'Nemo',
        type: Pet.FISH,
      },
    ],
  },
];

export {
  mockApplication,
};
