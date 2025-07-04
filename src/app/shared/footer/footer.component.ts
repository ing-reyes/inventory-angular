/**
 * Description: Contains footer logic.
 *
 * Author: Luis Reyes.
 * Creation Date: Thursday 25/01/2024
 * Last Modification: Thursday 25/01/2024
 * Version: v0.2.0
 * */

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  public date = new Date().getFullYear();

}
