import { Component, Input } from '@angular/core';
import {
  BreadcrumbConfig,
  Breadcrumb,
} from 'src/app/core/models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  showHome = true;
  homeName = 'Home';

  @Input() breadcrumbs: Breadcrumb[];

  @Input()
  set config(val: BreadcrumbConfig) {
    this.showHome = val.showHome === undefined ? true : val.showHome;
    this.homeName = val.homeName === undefined ? 'Home' : val.homeName;
  }

  constructor() {}
}
