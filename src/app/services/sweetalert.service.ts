/**
 * Description: Contains the logic of the sweetalert service.
 *
 * Author: Luis Reyes.
 * Creation Date: Friday 26/01/2024
 * Last Modification: Friday 26/01/2024
 * Version: v0.2.0
 * */

import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

import { Position, Icon } from '../types/types.sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  /**
   * This method evaluates whether the two passwords on the form are the same.
   * @param {Position} position This parameter only accepts the values ​​that were declared in the type.
   * @param {Icon} icon This parameter only accepts the values ​​that were declared in the type.
   * @param {string} title This parameter shows the message that will appear in the sweetalert.
   * @param {boolean} showConfirmButton This parameter indicates if we want to place a confirmation button.
   * @param {number} timer This parameter indicates the time we want the sweetalert to last.
   * @returns {void} Does not have return values.
   */
  sweetAlert2(
    position: Position,
    icon: Icon,
    title: string = 'success',
    text: string = '',
    showConfirmButton: boolean = true,
    timer: number = 1500
  ): void {
    Swal.fire({
      position,
      icon,
      title,
      text,
      showConfirmButton,
      timer,
    });
  }
}
