import {
  ComponentFixture,
  TestBed,
  async,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MockStore,
  provideMockStore,
} from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import { ApplicationActions } from './store/application.actions';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({
          initialState: [],
        }),
      ],
      declarations: [AppComponent],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initiate the dispatch event to fetch application', () => {
      spyOn(mockStore, 'dispatch');
      component.ngOnInit();

      expect(mockStore.dispatch).toHaveBeenCalledWith(ApplicationActions.fetchApplication());
    });
  });
});
