import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { mockApplication } from '../mocks/index';
import { Application } from '../models/application.model';
import { ApplicationService } from './application.service';

describe('ApplicationService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let service: ApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ApplicationService,
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApplicationService);
  });

  afterEach(() => httpMock.verify());

  it('should create service', () => {
    expect(service).toBeDefined();
  });

  it('should get the api data', () => {
    service.getPets()
      .subscribe((response: Array<Application>) => expect(response).toEqual(mockApplication));

    const req = httpMock.expectOne(environment.url);
    req.flush(mockApplication);

    expect(req.request.method).toBe('GET');
  });

  describe('when api response call has errors', () => {
    it('should throw an exception when HTTP response error is 400', () => {
      const error = new HttpErrorResponse({
        error: 'Failed download stream',
        status: 400,
        statusText: 'Bad request'
      });

      spyOn(httpClient, 'get').and.callFake(() => throwError(error));

      service.getPets()
        .subscribe((data) => expect(data).toEqual([]))
        .unsubscribe();
    });
  });
});
