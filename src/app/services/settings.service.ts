/**
 * Description: Contains the logic of the settings service.
 *
 * Author: Luis Reyes.
 * Creation Date: Friday 26/01/2024
 * Last Modification: Monday 29/01/2024
 * Version: v0.2.0
 * */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private themeLink = document.getElementById('theme') as HTMLLinkElement;
  public links: NodeListOf<Element> = document.querySelectorAll('.selector');

  constructor() {
    const theme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    if (theme) {
      this.themeLink.href = theme;
      return;
    }
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    localStorage.setItem('theme', url);
    this.themeLink.href = url;
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    links.forEach((elem) => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.themeLink.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    });
  }
}
