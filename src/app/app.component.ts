import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationActions } from './store/application.actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'agl-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private readonly store: Store) { }

  public ngOnInit(): void {
    this.store.dispatch(ApplicationActions.fetchApplication());
  }
}
