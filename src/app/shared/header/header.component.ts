/**
 * Description: Contains header logic.
 *
 * Author: Luis Reyes.
 * Creation Date: Thursday 25/01/2024
 * Last Modification: Thursday 25/01/2024
 * Version: v0.2.0
 * */

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink, CommonModule ],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  private readonly usersService = inject( UsersService );
  
  public user = this.usersService.user;

  logout(){
    this.usersService.logout();
  }

}
