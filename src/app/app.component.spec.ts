import {
  async,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MockStore,
  provideMockStore,
} from '@ngrx/store/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let mockStore: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        provideMockStore({
          initialState: [],
        }),
      ]
      declarations: [
        AppComponent,
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
  }));

  it('should create the app', () => {
    spyOn(mockStore, 'dispatch');
    mockStore.setState({
      router: {
        state: {
          root: {
            queryParams: {
              sopNumber: '0',
            },
          },
        },
      },
    });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

    expect(mockStore.dispatch).toHaveBeenCalledWith(ApplicationActions.fetchApplication());
  });
});
