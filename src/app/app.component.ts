import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { FooterComponent } from './footer/footer.component';
import { FactsComponent } from './landing/facts/facts.component';
import { FaqComponent } from './landing/faq/faq.component';
import { NewMoviesComponent } from './landing/new-movies/new-movies.component';

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
  ],
})
export class AppComponent {
  title = 'videoflix';
}
