import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  of,
} from 'rxjs';
import {
  catchError,
  retryWhen,
} from 'rxjs/operators';
import { Application } from '../models/index';

@Injectable()
export class ApplicationService {

  private readonly url = 'http://agl-developer-test.azurewebsites.net/people.json';

  constructor(protected httpClient: HttpClient) { }

  public getPets(): Observable<any> {
    return this.httpClient.get<Application>(this.url).pipe(
      catchError(error => of(error)),
    );
  }

}
