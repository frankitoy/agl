import {
  createFeatureSelector,
  createSelector,
  select,
} from '@ngrx/store';
import {
  isNil,
  negate as not,
} from 'lodash-es';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Application } from '../models/index';
import { ApplicationState } from './application.state';

export const applicationFeatureKey = 'application';

const applicationFeature = createFeatureSelector<ApplicationState>(applicationFeatureKey);
const applications = createSelector(applicationFeature, applicationState => applicationState?.applications);
const isSyncing = createSelector(applicationFeature, applicationState => applicationState?.isSyncing);

const applicationPipe = pipe(
  select(applications),
  filter<Array<Application>>(not(isNil)),
);

export const ApplicationSelectors = {
  applications,
  applicationFeature,
  applicationPipe,
  isSyncing,
};
