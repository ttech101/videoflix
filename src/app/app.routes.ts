import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { CompletelyComponent } from './account/completely/completely.component';
import { EnterPasswortComponent } from './account/enter-passwort/enter-passwort.component';
import { RestPasswortComponent } from './account/rest-passwort/rest-passwort.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'completely', component: CompletelyComponent },
  { path: 'enter-passwort', component: EnterPasswortComponent },
  { path: 'reset-passwort', component: RestPasswortComponent },
];
