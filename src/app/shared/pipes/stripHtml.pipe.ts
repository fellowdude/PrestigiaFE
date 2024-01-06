import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'stripHtml',
})
export class StripHtmlPipe implements PipeTransform {
  constructor(readonly sanitizer: DomSanitizer) {}

  transform(value: string) {
    return value.replace(/<[^>]*>/g, '');
  }
}
