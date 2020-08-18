import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatStatus'
})
export class FormatStatusPipe implements PipeTransform {

  transform(isAccepted) {
    if(isAccepted) {
        return 'Còn hàng';
    } else {
        return 'Hết hàng';
    }
}

}
