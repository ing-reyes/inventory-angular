import { Component, OnInit, inject } from '@angular/core';
import { SettingsService } from '@services/settings.service';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [],
  templateUrl: './account-settings.component.html',
  styles: ``
})
export default class AccountSettingsComponent implements OnInit {
  private settings = inject( SettingsService )

  ngOnInit(): void {
    this.settings.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this.settings.changeTheme(theme);
  }
}
