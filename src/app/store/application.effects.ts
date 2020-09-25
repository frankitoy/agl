import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  switchMap,
} from 'rxjs/operators';

import { ApplicationService } from '../services/application.service';
import { ApplicationActions } from './application.actions';

@Injectable()
export class ApplicationEffects {
  public fetchApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationActions.fetchApplication),
      switchMap(() => this.applicationService.getPets()),
      switchMap(applications => of(ApplicationActions.fetchApplicationSuccess({ applications }))),
      catchError(() => of(ApplicationActions.fetchApplicationError()))
    )
  );

  constructor(private readonly actions$: Actions, private readonly applicationService: ApplicationService) {}
}
