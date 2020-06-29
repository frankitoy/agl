import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/index';

@Injectable()
export class ApplicationService {

  protected basePath = '/api/';

  constructor(protected httpClient: HttpClient) { }

  public getPets(): Observable<any> {
    return this.httpClient.request<Application>('get',`${this.basePath}pets.json`);
  }

}
