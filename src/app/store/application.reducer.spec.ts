import { Action } from '@ngrx/store';

import { mockApplication } from '../mocks/index';
import { ApplicationActions } from './application.actions';
import {
  applicationInitialState,
  applicationReducer,
} from './application.reducer';
import { ApplicationState } from './application.state';

describe('ApplicationReducer', () => {
  let state: ApplicationState;
  const isSyncingTrueActions = {
    fetchApplication: ApplicationActions.fetchApplication,
  };

  const successActions = {
    fetchApplicationSuccess: ApplicationActions.fetchApplicationSuccess,
  };

  const errorActions = {
    fetchApplicationError: ApplicationActions.fetchApplicationError,
  };

  const reducer = (action: Action) => {
    state = applicationReducer(applicationInitialState, action);
  };

  Object.keys(isSyncingTrueActions).forEach(actionName => {
    describe(`when ${actionName}`, () => {
      it('should set isSyncing to true', () => {
        reducer(isSyncingTrueActions[actionName]);
        expect(state.isSyncing).toEqual(true);
      });
    });
  });

  Object.keys(successActions).forEach(actionName => {
    describe(`when ${actionName}`, () => {
      it('should set isSyncing to false and set application', () => {
        const applications = mockApplication;
        reducer(successActions[actionName]({ applications }));
        expect(state.applications).toEqual(applications);
        expect(state.isSyncing).toEqual(false);
      });
    });
  });

  Object.keys(errorActions).forEach(actionName => {
    describe(`when ${actionName}`, () => {
      it('should set isSyncing to false and set application', () => {
        reducer(errorActions[actionName]);
        expect(state.isSyncing).toEqual(false);
      });
    });
  });
});
