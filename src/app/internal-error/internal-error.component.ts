import { Component } from '@angular/core';

@Component({
  selector: 'app-internal-error',
  template:
    '<p>Hubo un error al cargar la página, por favor intente nuevamente luego.</p>',
})
export class InternalErrorComponent {
  constructor() {}
}
