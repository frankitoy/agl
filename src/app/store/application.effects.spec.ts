import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  Action,
  StoreModule,
} from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  Application as ApplicationFromServer,
  ApplicationResponse,
  ApplicationsService,
} from '@sst/anz-data-library';
import { Subject } from 'rxjs';
import { PartyRole } from '../../parties/party-role.enum';
import { PartySopNumber } from '../../parties/party-sop-number.enum';
import { PartyType } from '../../parties/party-type.enum';
import { PartiesActions } from '../../parties/store/parties.actions';
import {
  partiesInitialState,
  partiesReducer,
} from '../../parties/store/parties.reducer';
import { partiesFeatureKey } from '../../parties/store/parties.selector';
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

interface TestData {
  applicationResponseSubject$: Subject<ApplicationResponse>;
  actionSubject$: Subject<Action>;
  actions$Spy: Spy;
  applicationEffects: ApplicationEffects;
}

describe(ApplicationEffects.name, () => {

  let testData: TestData;
  let applicationServiceMockObj: jasmine.SpyObj<ApplicationsService>;
  const applicationFromServer: ApplicationFromServer = {
    id: 'application',
    number: '123',
    settlementDate: '2020-06-06',
    scenarioPurposeSelections: [],
  };
  const applicationResponse: ApplicationResponse = { data: applicationFromServer };
  const applicationResponseWithEntities: ApplicationResponse = {
    data: {
      ...applicationFromServer,
      purposes: [],
      parties: [],
      assets: [],
    },
  };
  const application = {
    id: 'application',
    number: '123',
    settlementDate: '2020-06-06',
    scenarioPurposeSelections: [],
  };
  const defaultPartySetUp = {
    type: PartyType.INDIVIDUAL,
    role: PartyRole.APPLICANT,
    isExistingCustomer: false,
    person: {
      sopNumber: PartySopNumber.S1,
    },
  };

  beforeEach(mockTestBed);

  afterEach(() => testData = null);

  describe('addApplication$', () => {
    const createApplicationRequest = { accountNumber: '123' };

    describe('when add application is successful', () => {
      it(`should dispatch addApplicationSuccess`, () => {
        testData.applicationEffects.addApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.addApplication({ createApplicationRequest }));
        testData.applicationResponseSubject$.next(applicationResponse);

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.addApplicationSuccess({ application }));
      });

      it('should dispatch PartiesAction.addParty', () => {
        testData.applicationEffects.addApplicationSuccess$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.addApplicationSuccess({ application }));
        testData.applicationResponseSubject$.next(applicationResponse);

        expect(testData.actions$Spy).toHaveBeenCalledWith(PartiesActions.addParty({ party: defaultPartySetUp }));
      });
    });

    describe('when add application fails', () => {
      it(`should dispatch addApplicationError`, () => {
        applicationServiceMockObj.createApplication.and.callFake(() => {
          throw new Error('Required parameter body was null or undefined when calling updateApplication.');
        });
        testData.applicationEffects.addApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.addApplication({ createApplicationRequest }));

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.addApplicationError());
      });
    });
  });

  describe('fetchApplication$', () => {
    describe('when fetch simple application is successful', () => {
      it(`should dispatch fetchApplicationSuccess`, () => {
        testData.applicationEffects.fetchApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.fetchApplication({ applicationId: '121' }));
        testData.applicationResponseSubject$.next(applicationResponse);

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.fetchApplicationSuccess({ application }));
      });
    });

    describe('when fetch application with entities is successful', () => {
      it(`should dispatch fetchApplicationSuccess`, () => {
        testData.applicationEffects.fetchApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.fetchApplication({ applicationId: '122' }));
        testData.applicationResponseSubject$.next(applicationResponseWithEntities);

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.fetchApplicationSuccess({ application }));
      });
    });

    describe('when fetch application fails', () => {
      it(`should dispatch fetchApplicationError`, () => {
        applicationServiceMockObj.getApplication.and.callFake(() => {
          throw new Error('Required parameter body was null or undefined when calling updateApplication.');
        });
        testData.applicationEffects.fetchApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.fetchApplication({ applicationId: '121' }));

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.fetchApplicationError());
      });
    });
  });

  describe('generateDocumentPack$', () => {
    describe('when generate document pack is successful', () => {
      it(`should dispatch generateDocumentPackSuccess`, () => {
        testData.applicationEffects.generateDocumentPack$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.generateDocumentPack({ applicationId: '123' }));
        testData.applicationResponseSubject$.next(applicationResponse);

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.generateDocumentPackSuccess({ application }));
      });
    });

    describe('when generate document pack fails', () => {
      it(`should dispatch generateDocumentPackError`, () => {
        applicationServiceMockObj.generateDocumentPack.and.callFake(() => {
          throw new Error('Required parameter body was null or undefined when calling updateApplication.');
        });
        testData.applicationEffects.generateDocumentPack$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.generateDocumentPack({ applicationId: '123' }));

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.generateDocumentPackError());
      });
    });
  });

  describe('prefetchApplication$', () => {
    describe('when a simple readonly application is successful', () => {
      it(`should dispatch prefetchApplicationSuccess`, () => {
        testData.applicationEffects.prefetchApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.prefetchApplication({ applicationId: '121' }));
        const readOnlyApplicationResponse = {
          ...applicationResponse,
          data: {
            ...applicationResponse.data,
            isReadOnly: true,
          },
        };
        testData.applicationResponseSubject$.next(readOnlyApplicationResponse);
        const readOnlyApplication = { ...application, isReadOnly: true };
        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.prefetchApplicationSuccess(
          { application: readOnlyApplication },
        ));
      });
    });

    describe('when a simple editable application is successful', () => {
      it(`should dispatch fetchApplication`, () => {
        testData.applicationEffects.prefetchApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.prefetchApplication({ applicationId: '121' }));
        const editableApplicationResponse = {
          ...applicationResponse,
          data: {
            ...applicationResponse.data,
            isReadOnly: false,
          },
        };
        testData.applicationResponseSubject$.next(editableApplicationResponse);
        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.fetchApplication(
          { applicationId: 'application', isResumable: true },
        ));
      });
    });

    describe('when readonly application with entities is successful', () => {
      it(`should dispatch prefetchApplicationSuccess`, () => {
        testData.applicationEffects.prefetchApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.prefetchApplication({ applicationId: '122' }));

        const readOnlyApplicationResponse = {
          ...applicationResponseWithEntities,
          data: {
            ...applicationResponseWithEntities.data,
            isReadOnly: true,
          },
        };
        const readOnlyApplication = { ...application, isReadOnly: true };

        testData.applicationResponseSubject$.next(readOnlyApplicationResponse);

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.prefetchApplicationSuccess(
          { application: readOnlyApplication },
        ));
      });
    });

    describe('when a editable application with entities is successful', () => {
      it(`should dispatch fetchApplication`, () => {
        testData.applicationEffects.prefetchApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.prefetchApplication({ applicationId: '122' }));

        const editableApplicationResponse = {
          ...applicationResponseWithEntities,
          data: {
            ...applicationResponseWithEntities.data,
            isReadOnly: false,
          },
        };

        testData.applicationResponseSubject$.next(editableApplicationResponse);

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.fetchApplication(
          { applicationId: 'application', isResumable: true },
        ));
      });
    });

    describe('when prefetch application fails', () => {
      it(`should dispatch prefetchApplicationError`, () => {
        applicationServiceMockObj.getApplication.and.callFake(() => {
          throw new Error('Required parameter body was null or undefined when calling updateApplication.');
        });
        testData.applicationEffects.prefetchApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.prefetchApplication({ applicationId: '121' }));

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.prefetchApplicationError());
      });
    });
  });

  describe('startApplication$', () => {
    describe('when start application is successful', () => {
      it(`should dispatch startApplicationSuccess`, () => {
        testData.applicationEffects.startApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.startApplication({ applicationId: '123' }));
        testData.applicationResponseSubject$.next(applicationResponse);

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.startApplicationSuccess({ application }));
      });
    });

    describe('when start application fails', () => {
      it(`should dispatch startApplicationError`, () => {
        applicationServiceMockObj.startApplication.and.callFake(() => {
          throw new Error('Required parameter body was null or undefined when calling updateApplication.');
        });
        testData.applicationEffects.startApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.startApplication({ applicationId: '123' }));

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.startApplicationError());
      });
    });
  });

  describe('storeXpressionRequest$', () => {
    const xpressionRequest = { type: 'type', request: 'request' };

    describe('when store xpression request is successful', () => {
      it(`should dispatch storeXpressionRequestSuccess`, () => {
        testData.applicationEffects.storeXpressionRequest$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.storeXpressionRequest({
          xpressionRequest, applicationId: '123',
        }));
        testData.applicationResponseSubject$.next(applicationResponse);

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.storeXpressionRequestSuccess({ application }));
      });
    });

    describe('when store xpression request fails', () => {
      it(`should dispatch storeXpressionRequestError`, () => {
        applicationServiceMockObj.storeXpressionRequest.and.callFake(() => {
          throw new Error('Required parameter body was null or undefined when calling updateApplication.');
        });
        testData.applicationEffects.storeXpressionRequest$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.storeXpressionRequest({ xpressionRequest, applicationId: '123' }));

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.storeXpressionRequestError());
      });
    });
  });

  describe('updateApplication$', () => {
    describe('when update application is successful', () => {
      it(`should dispatch updateApplicationSuccess`, () => {
        testData.applicationEffects.updateApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.updateApplication({ application, applicationId: '123' }));
        testData.applicationResponseSubject$.next(applicationResponse);

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.updateApplicationSuccess({ application }));
      });
    });

    describe('when update application fails', () => {
      it(`should dispatch updateApplicationError`, () => {
        applicationServiceMockObj.updateApplication.and.callFake(() => {
          throw new Error('Required parameter body was null or undefined when calling updateApplication.');
        });
        testData.applicationEffects.updateApplication$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.updateApplication({ application, applicationId: '123' }));

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.updateApplicationError());
      });
    });
  });

  describe('updateSettlementDate$', () => {
    describe('when update settlement date is successful', () => {
      it(`should dispatch updateApplicationSettlementDateSuccess`, () => {
        testData.applicationEffects.updateSettlementDate$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.updateApplicationSettlementDate({ settlementDate: '2020-06-06' }));
        testData.applicationResponseSubject$.next(applicationResponse);

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.updateApplicationSettlementDateSuccess({ application }));
      });
    });

    describe('when update settlement date fails', () => {
      it(`should dispatch updateApplicationSettlementDateError`, () => {
        applicationServiceMockObj.triggerApplicationOperation.and.callFake(() => {
          throw new Error('Required parameter body was null or undefined when calling triggerApplicationOperation.');
        });
        testData.applicationEffects.updateSettlementDate$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.updateApplicationSettlementDate({ settlementDate: '2020-06-06' }));

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.updateApplicationSettlementDateError());
      });
    });
  });

  describe('updateScenarioPurposeSelection$', () => {
    describe('when update scenario purpose selection is successful', () => {
      it(`should dispatch updateScenarioPurposeSelectionSuccess`, () => {
        testData.applicationEffects.updateScenarioPurposeSelection$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.updateScenarioPurposeSelection({ isActive: true, purposeType: 'Test' }));
        testData.applicationResponseSubject$.next(applicationResponse);

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.updateScenarioPurposeSelectionSuccess({ application }));
      });
    });

    describe('when update scenario purpose selection fails', () => {
      it(`should dispatch updateScenarioPurposeSelectionError`, () => {
        applicationServiceMockObj.triggerApplicationOperation.and.callFake(() => {
          throw new Error('Required parameter body was null or undefined when calling triggerApplicationOperation.');
        });
        testData.applicationEffects.updateScenarioPurposeSelection$.subscribe(testData.actions$Spy);
        testData.actionSubject$.next(ApplicationActions.updateScenarioPurposeSelection({ isActive: false, purposeType: 'Test' }));

        expect(testData.actions$Spy).toHaveBeenCalledWith(ApplicationActions.updateScenarioPurposeSelectionError());
      });
    });
  });

  function mockTestBed(): void {
    const actionSubject$: Subject<Action> = new Subject();
    const applicationResponseSubject$: Subject<ApplicationResponse> = new Subject();
    applicationServiceMockObj = jasmine.createSpyObj<ApplicationsService>([
      'createApplication',
      'generateDocumentPack',
      'getApplication',
      'startApplication',
      'storeXpressionRequest',
      'triggerApplicationOperation',
      'updateApplication',
    ]);

    applicationServiceMockObj.createApplication.and.returnValue(applicationResponseSubject$.asObservable() as any);
    applicationServiceMockObj.getApplication.and.returnValue(applicationResponseSubject$.asObservable() as any);
    applicationServiceMockObj.generateDocumentPack.and.returnValue(applicationResponseSubject$.asObservable() as any);
    applicationServiceMockObj.startApplication.and.returnValue(applicationResponseSubject$.asObservable() as any);
    applicationServiceMockObj.storeXpressionRequest.and.returnValue(applicationResponseSubject$.asObservable() as any);
    applicationServiceMockObj.updateApplication.and.returnValue(applicationResponseSubject$.asObservable() as any);
    applicationServiceMockObj.triggerApplicationOperation.and.returnValue(applicationResponseSubject$.asObservable() as any);

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(applicationFeatureKey, applicationReducer),
        StoreModule.forFeature(partiesFeatureKey, partiesReducer),
      ],
      providers: [
        provideMockActions(() => actionSubject$.asObservable()),
        provideMockStore({
          initialState: {
            [applicationFeatureKey]: applicationInitialState,
            [partiesFeatureKey]: partiesInitialState,
          },
        }),
        ApplicationEffects,
        {
          provide: ApplicationsService,
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
    mockStore.overrideSelector(ApplicationSelectors.application, application);
  }
});
