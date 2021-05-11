import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string, now: number): number {
    const createdAt: number = Date.parse(value);
    const offsetInMilliseconds: number = (new Date()).getTimezoneOffset() * 60 * 1000;

    const ellapsedMilliseconds = now - createdAt + offsetInMilliseconds;
    return Math.floor(ellapsedMilliseconds / 1000 / 60);
  }

}
