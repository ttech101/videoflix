import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { CompletelyComponent } from './account/completely/completely.component';
import { EnterPasswortComponent } from './account/enter-passwort/enter-passwort.component';
import { RestPasswortComponent } from './account/rest-passwort/rest-passwort.component';
import { HomeComponent } from './content/home/home.component';
import { SeriesComponent } from './content/series/series.component';
import { MoviesComponent } from './content/movies/movies.component';
import { SerchComponent } from './content/serch/serch.component';
import { WatchlistComponent } from './content/watchlist/watchlist.component';
import { ImprintComponent } from './policy/imprint/imprint.component';
import { PrivacyPolicyComponent } from './policy/privacy-policy/privacy-policy.component';
import { CookiePolicyComponent } from './policy/cookie-policy/cookie-policy.component';
import { UploadComponent } from './storage/upload/upload.component';
import { SingleViewComponent } from './content/single-view/single-view.component';
import { LandingResetPasswordComponent } from './account/landing-reset-password/landing-reset-password.component';
import { authGuard } from './service/auth.guard';
import { MyComponent } from './content/my/my.component';
import { NatureComponent } from './content/nature/nature.component';
import { FunnyComponent } from './content/funny/funny.component';
import { KnowledgeComponent } from './content/knowledge/knowledge.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'completely', component: CompletelyComponent },
  { path: 'enter-passwort', component: EnterPasswortComponent },
  { path: 'reset-passwort', component: RestPasswortComponent },
  { path: 'landing-reset-password', component: LandingResetPasswordComponent },
  {
    path: 'watchlist',
    component: WatchlistComponent,
    canActivate: [authGuard],
  },
  { path: 'imprint', component: ImprintComponent },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'cookie-policy',
    component: CookiePolicyComponent,
  },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'series', component: SeriesComponent, canActivate: [authGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [authGuard] },
  { path: 'serch', component: SerchComponent, canActivate: [authGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [authGuard] },
  {
    path: 'single-view',
    component: SingleViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my',
    component: MyComponent,
    canActivate: [authGuard],
  },
  {
    path: 'nature',
    component: NatureComponent,
    canActivate: [authGuard],
  },
  {
    path: 'funny',
    component: FunnyComponent,
    canActivate: [authGuard],
  },
  {
    path: 'knowledge',
    component: KnowledgeComponent,
    canActivate: [authGuard],
  },
];
