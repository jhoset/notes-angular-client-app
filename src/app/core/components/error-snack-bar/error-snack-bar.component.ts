import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-error-snack-bar',
  templateUrl: './error-snack-bar.component.html'
})
export class ErrorSnackBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log('Data', data);
  }

}
