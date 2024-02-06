import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { FooterComponent } from './templates/footer/footer.component';
import { FactsComponent } from './landing/facts/facts.component';
import { FaqComponent } from './landing/faq/faq.component';
import { NewMoviesComponent } from './landing/new-movies/new-movies.component';
import { HeroComponent } from './landing/hero/hero.component';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CookieBannerComponent } from './module/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService],
  imports: [
    CommonModule,
    RouterOutlet,
    LandingPageComponent,
    FooterComponent,
    FactsComponent,
    FaqComponent,
    NewMoviesComponent,
    HeroComponent,
    HttpClientModule,
    CookieBannerComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'videoflix';
  http: any;

  constructor(private router: Router, private as: AuthService) {}

  async ngOnInit() {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'en');
    }
    // if (localStorage.getItem('authToken')) {
    //   let resp: any = await this.as.checkToken(
    //     localStorage.getItem('authToken')
    //   );
    //   if (resp.status) {
    //     sessionStorage.setItem('account', 'true');
    //   } else {
    //     sessionStorage.setItem('account', 'false');
    //   }
    // }
    // if (!localStorage.getItem('cookieAccepted')) {
    // }
  }
}
