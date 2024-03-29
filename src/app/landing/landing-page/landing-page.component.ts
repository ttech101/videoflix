import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NewMoviesComponent } from '../new-movies/new-movies.component';
import { FactsComponent } from '../facts/facts.component';
import { HeroComponent } from '../hero/hero.component';
import { FaqComponent } from '../faq/faq.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieBannerComponent } from '../../module/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    NewMoviesComponent,
    FactsComponent,
    HeroComponent,
    FaqComponent,
    FooterComponent,
    CookieBannerComponent,
  ],
})
export class LandingPageComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      if (sessionStorage.getItem('account') == 'true') {
        this.router.navigate(['/home']);
      }
    }, 1000);
  }
}
