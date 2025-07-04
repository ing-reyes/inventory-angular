/**
 * Description: Contains 404 page not found logic.
 *
 * Author: Luis Reyes.
 * Creation Date: Thursday 25/01/2024
 * Last Modification: Thursday 25/01/2024
 * Version: v0.2.0
 * */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nopagefound',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './nopagefound.component.html',
  styleUrl: './nopagefound.component.css',
})
export default class NopagefoundComponent {
  public year = new Date().getFullYear();

}
