import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import {
  Store,
  union,
} from '@ngrx/store';
import {
  of,
} from 'rxjs';
import {
  catchError,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { Application } from '../models/index';
import { ApplicationActions } from './application.actions';
import { ApplicationService } from '../services/application.service';

const applicationSuccessActions = union({
  fetchApplicationSuccess: ApplicationActions.fetchApplicationSuccess,
});
export type ApplicationSuccessActionUnion = typeof applicationSuccessActions;

@Injectable()
export class ApplicationEffects {

  public fetchApplication$ = createEffect(() => this.actions$.pipe(
    ofType(ApplicationActions.fetchApplication),
    mergeMap(() => this.applicationService.getPets()),
    switchMap((applicationResponse: Application) => {
      const application = applicationResponse;
      const applicationFetchSuccess = ApplicationActions.fetchApplicationSuccess({ application });
      return this.setApplicationBatch(application, applicationFetchSuccess);
    }),
    catchError(() => of(ApplicationActions.fetchApplicationError())),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly applicationService: ApplicationService,
    private readonly store: Store,
  ) {
  }

  private setApplicationBatch(
    application: Application,
    applicationSuccessAction: ApplicationSuccessActionUnion,
  ): Array<ApplicationSuccessActionUnion> {
    return [...application as any, applicationSuccessAction];
  }
}
