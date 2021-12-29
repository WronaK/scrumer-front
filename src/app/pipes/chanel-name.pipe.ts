import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chanelName'
})
export class ChanelNamePipe implements PipeTransform {

  transform(value: string): string {
    const words = value.split(" ");
    return words
      .map(w => w.charAt(0))
      .join("");
  }

}
