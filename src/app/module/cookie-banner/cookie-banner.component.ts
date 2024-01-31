import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [MatButtonModule, CommonModule, TranslateModule],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss',
})
export class CookieBannerComponent {
  constructor(public translate: TranslateService) {}
  check_cookie: boolean = false;

  ngOnInit() {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    let cookie_ok = localStorage.getItem('cookie_accept');
    if (cookie_ok == 'true') {
      this.check_cookie = true;
    } else {
      this.check_cookie = false;
    }
  }
  acceptCookies() {
    localStorage.setItem('cookie_accept', 'true');
    this.check_cookie = true;
  }
}
