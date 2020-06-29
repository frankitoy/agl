import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  Action,
  StoreModule,
} from '@ngrx/store';
import {
  MockStore,
  provideMockStore,
} from '@ngrx/store/testing';
import { ApplicationActions } from './application.actions';
import { ApplicationEffects } from './application.effects';
import {
  applicationInitialState,
  applicationReducer,
} from './application.reducer';
import {
  applicationFeatureKey,
  ApplicationSelectors,
} from './application.selectors';

import Spy = jasmine.Spy;
import { mockApplication } from '../mocks/index';
import { ApplicationService } from '../services/application.service';
import { Subject } from 'rxjs';
import { Application } from '../models/application.model';

describe(ApplicationEffects.name, () => {

  let testData: any;
  let applicationServiceMockObj: jasmine.SpyObj<ApplicationService>;

  beforeEach(mockTestBed);

  afterEach(() => testData = null);

  describe('fetchApplication$', () => {
    describe('when fetch simple application is successful', () => {
      it(`should dispatch fetchApplicationSuccess`, () => {
        testData.applicationEffects.fetchApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.fetchApplication());

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.fetchApplicationSuccess(
          { application: mockApplication[0] }
        ));
      });
    });

    describe('when fetch application fails', () => {
      it(`should dispatch fetchApplicationError`, () => {
        applicationServiceMockObj.getPets.and.callFake(() => {
          throw new Error('Required parameter body was null or undefined when calling get pets.');
        });
        testData.applicationEffects.fetchApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.fetchApplication());

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.fetchApplicationError());
      });
    });
  });

  function mockTestBed(): void {
    const actionSubject$: Subject<Action> = new Subject();
    const applicationResponseSubject$: Subject<Application> = new Subject();
    applicationServiceMockObj = jasmine.createSpyObj<ApplicationService>([
      'getPets',
    ]);

    applicationServiceMockObj.getPets.and.returnValue(applicationResponseSubject$.asObservable() as any);

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(applicationFeatureKey, applicationReducer),
      ],
      providers: [
        provideMockActions(() => actionSubject$.asObservable()),
        provideMockStore({
          initialState: {
            [applicationFeatureKey]: applicationInitialState,
          },
        }),
        ApplicationEffects,
        {
          provide: ApplicationService,
          useValue: applicationServiceMockObj,
        },
      ],
    });

    testData = {
      actionSubject$,
      actions$Spy: jasmine.createSpy('actions$Spy'),
      applicationEffects: TestBed.inject(ApplicationEffects),
      applicationResponseSubject$,
    };
    const mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(ApplicationSelectors.application, mockApplication[0]);
  }
});
