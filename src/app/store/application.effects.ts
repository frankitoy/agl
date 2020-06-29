import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { union } from '@ngrx/store';
import {
  of,
} from 'rxjs';
import {
  catchError,
  switchMap,
} from 'rxjs/operators';
import { ApplicationActions } from './application.actions';
import { ApplicationService } from '../services/application.service';

@Injectable()
export class ApplicationEffects {

  public fetchApplication$ = createEffect(() => this.actions$.pipe(
    ofType(ApplicationActions.fetchApplication),
    switchMap(() => this.applicationService.getPets()),
    switchMap(application => of(ApplicationActions.fetchApplicationSuccess({ application }))),
    catchError(() => of(ApplicationActions.fetchApplicationError())),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly applicationService: ApplicationService,
  ) {
  }
}
