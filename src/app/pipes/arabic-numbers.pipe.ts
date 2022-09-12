import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arabicNumbers',
  pure: false
})
export class ArabicNumbersPipe implements PipeTransform {


  transform(number: any): any {
    return number.Date().toLocaleString('ar-EG')

  }

}
