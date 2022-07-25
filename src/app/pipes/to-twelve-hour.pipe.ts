import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTwelveHour'
})
export class ToTwelveHourPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
