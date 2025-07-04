/**
 * Description: Contains the types for the position and icons of the Sweetalert.
 *
 * Author: Luis Reyes.
 * Creation Date: Friday 26/01/2024
 * Last Modification: Friday 26/01/2024
 * Version: v0.2.0
 * */

/**
 * Position only supports declared types.
 *
 * @public
 * @destination SweetalertService
 */
export type Position =
  | 'bottom'
  | 'bottom-end'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-start'
  | 'center'
  | 'center-end'
  | 'center-left'
  | 'center-right'
  | 'center-start'
  | 'top'
  | 'top-end'
  | 'top-left'
  | 'top-right'
  | 'top-start';

/**
 * Icon only supports declared types.
 *
 * @public
 * @destination SweetalertService
 */
export type Icon = 'error' | 'info' | 'question' | 'success' | 'warning';
