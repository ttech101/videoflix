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

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
  ],
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  title = 'videoflix';

  constructor(private router: Router, private as: AuthService) {}

  async ngOnInit() {
    if (localStorage.getItem('authToken')) {
      let resp: any = await this.as.checkToken(
        localStorage.getItem('authToken')
      );
      if (resp.status) {
        sessionStorage.setItem('account', 'true');
      } else {
        sessionStorage.setItem('account', 'false');
      }
    }
  }
}
