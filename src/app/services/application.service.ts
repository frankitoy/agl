import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  of,
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Application } from '../models/index';

@Injectable()
export class ApplicationService {

  constructor(private readonly httpClient: HttpClient) { }

  public getPets(): Observable<Array<Application>> {
    return this.httpClient.get<Array<Application>>(environment.url).pipe(
      catchError(() => of([])),
    );
  }

}
