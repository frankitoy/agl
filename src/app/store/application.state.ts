import { Application } from '../models/index';

export interface ApplicationState {
  application: Application;
  isSyncing: boolean;
}
