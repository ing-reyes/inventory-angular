/**
 * Description: Contains pages logic of the application (Header, Sidebar, Breadcrumbs, Footer).
 *
 * The html template only has the router-outlet and the shared components.
 *
 * Author: Luis Reyes.
 * Creation Date: Thursday 25/01/2024
 * Last Modification: Thursday 25/01/2024
 * Version: v0.2.0
 * */

import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SettingsService } from '@services/settings.service';
import { FooterComponent } from '@shared/footer/footer.component';
import { ModalDocumentComponent } from 'components/modal-document/modal-document.component';


declare function customInitScript(): void;

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent, ModalDocumentComponent
  ],
  templateUrl: './pages.component.html',
  styles: ``,
})
export default class PagesComponent implements OnInit {
  private readonly settingsService = inject(SettingsService);
  constructor() {}
  ngOnInit(): void {
    customInitScript();
    this.settingsService.checkCurrentTheme();
  }
}
