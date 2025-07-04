/**
 * Description: Contains breadcrumbs logic.
 *
 * Author: Luis Reyes.
 * Creation Date: Thursday 25/01/2024
 * Last Modification: Thursday 25/01/2024
 * Version: v0.2.0
 * */

import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumbs.component.html',
  styles: ``
})
export class BreadcrumbsComponent {

  public route = inject( ActivatedRoute );
  public router = inject( Router );
  public title = input('title');
  constructor() {}
  // ngOnInit(): void {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       this.title = this.route.snapshot.firstChild?.data['title'];
  //     }
  //   });
  // }

}
