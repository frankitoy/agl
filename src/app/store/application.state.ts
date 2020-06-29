import { Application } from '../models/index';

export interface ApplicationState {
  applications: Array<Application>;
  isSyncing: boolean;
}
