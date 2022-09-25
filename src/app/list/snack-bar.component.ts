import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'app-snack-bar-component',
    template: `<span class="message">{{data}}</span>`,
    styles: [`.message {
      color: #FFFFFF;
    }`],
})
export class AppSnackBarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
}