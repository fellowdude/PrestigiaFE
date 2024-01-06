import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-reload',
  templateUrl: './error-reload.component.html',
  styleUrls: ['./error-reload.component.scss'],
})
export class ErrorReloadComponent {
  // TODO refactor this into app-loader component
  @Output() onReload: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
}
