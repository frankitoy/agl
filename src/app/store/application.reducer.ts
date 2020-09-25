import {
  Action,
  ActionReducer,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import {
  enableES5,
  produce,
} from 'immer';
import { environment } from 'src/environments/environment';

import { ApplicationActions } from './application.actions';
import { ApplicationState } from './application.state';

export const applicationInitialState: ApplicationState = {
  applications: null,
  isSyncing: false,
};

// tslint:disable-next-line:variable-name
const _applicationReducer = createReducer(
  applicationInitialState,

  on(ApplicationActions.fetchApplication, state => {
    state.isSyncing = true;
    return state;
  }),

  on(ApplicationActions.fetchApplicationSuccess, (state, { applications }) => {
    state.applications = applications;
    state.isSyncing = false;
    return state;
  }),

  on(ApplicationActions.fetchApplicationError, state => {
    state.isSyncing = false;
    return state;
  }),
);

export function logger(reducer: ActionReducer<ApplicationState>): ActionReducer<ApplicationState> {
  return (state, action) => {
    const result = reducer(state, action);
    return result;
  };
}

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production ? [logger] : [];

export function applicationReducer(state: ApplicationState, action: Action): ApplicationState {
  enableES5();
  return produce(state, draft => _applicationReducer(draft, action));
}
