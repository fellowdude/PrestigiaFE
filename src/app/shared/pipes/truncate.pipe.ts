import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 140, trail = '...') {
    if (!value) {
      value = '';
    }

    if (limit < 0) {
      limit *= -1;
      return value.length > limit
        ? trail + value.substring(value.length - limit, value.length)
        : value;
    } else {
      return value.length > limit ? value.substring(0, limit) + trail : value;
    }
  }
}
