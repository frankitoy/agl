import {
  createAction,
  props,
} from '@ngrx/store';
import { Application } from '../models/index';

const fetchApplication = createAction('[application][fetch]');

const fetchApplicationSuccess = createAction(
  '[application][fetch][success]',
  props<{ application: Application }>(),
);

const fetchApplicationError = createAction('[application][fetch][error]');

export const ApplicationActions = {
  fetchApplication,
  fetchApplicationError,
  fetchApplicationSuccess,
};
