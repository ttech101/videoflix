import { Component } from '@angular/core';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-reset-password',
  standalone: true,
  imports: [
    FooterComponent,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './landing-reset-password.component.html',
  styleUrl: './landing-reset-password.component.scss',
})
export class LandingResetPasswordComponent {
  set_headline: string = '3. SCHRITT';
  set_header: string = 'Bestätige deine E-Mail';
  set_text: string =
    'Bitte prüfe dein E-Mail Postfach und bestätige den darinenhaltenen Link.';
  hide = true;
  confirm_email: Boolean = false;
  confirm_passwort: boolean = false;
  email!: string;
  password_correct: boolean = false;
  password_incorrect: string = '';
  emailerror = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  ]);
  passwort1 = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  passwort2 = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  formData: any;

  constructor(private router: Router) {}

  getErrorMessagePasswort1() {
    if (this.passwort1.hasError('required')) {
      return 'You must enter a value passwort ';
    }
    // Überprüfe, ob die E-Mail-Adresse gültig ist
    if (this.passwort1.hasError('pattern')) {
      return 'Not a valid passwort';
    }
    return '';
  }

  getErrorMessagePasswort2() {
    if (this.passwort2.hasError('required')) {
      return 'You must enter a value passwort';
    }
    // Überprüfe, ob die E-Mail-Adresse gültig ist
    if (this.passwort2.hasError('pattern')) {
      return 'Not a valid passwort';
    }
    return '';
  }

  passwortConfirm() {
    if (
      this.passwort1.valid == true &&
      this.passwort2.valid == true &&
      this.passwort1.value == this.passwort2.value
    ) {
      this.password_incorrect = '';
      return true;
    }
    if (
      this.passwort1.valid == true &&
      this.passwort2.valid == true &&
      this.passwort1.value != this.passwort2.value
    ) {
      this.password_incorrect = 'Passwords are ok but don`t match';
      return false;
    } else {
      return false;
    }
  }

  submitForm() {
    this.password_correct = this.passwortConfirm();
    if (this.emailerror.valid == true && this.password_correct == true) {
      this.router.navigate(['/completely']);
    }
  }
}
