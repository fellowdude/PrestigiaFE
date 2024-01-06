import { AfterContentInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements AfterContentInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }

  public ngAfterContentInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 300);
  }
}
