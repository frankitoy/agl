import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'agl-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
