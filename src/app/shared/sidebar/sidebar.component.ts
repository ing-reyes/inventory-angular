/**
 * Description: Contains sidebar logic.
 *
 * Author: Luis Reyes.
 * Creation Date: Thursday 25/01/2024
 * Last Modification: Thursday 25/01/2024
 * Version: v0.2.0
 * */

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  private readonly sidebarService = inject(SidebarService);
  private readonly usersService = inject(UsersService);
  public menuItems: any; 


  public user = this.usersService.user


  constructor() {
    this.menuItems = this.sidebarService.menu;
  }

  logout() {
    this.usersService.logout();
  }

}
