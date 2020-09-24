import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationSelectors } from 'src/app/store/application.selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'agl-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public readonly application$ = this.store.select(ApplicationSelectors.applications);
  public readonly isSyncing$ = this.store.select(ApplicationSelectors.isSyncing);

  constructor(private readonly store: Store) { }

}
