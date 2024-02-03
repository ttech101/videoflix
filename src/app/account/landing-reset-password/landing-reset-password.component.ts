import { Component, OnInit } from '@angular/core';
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
import { AuthService } from '../../service/auth.service';
import { DataService } from '../../service/data.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    TranslateModule,
  ],
  templateUrl: './landing-reset-password.component.html',
  styleUrl: './landing-reset-password.component.scss',
})
export class LandingResetPasswordComponent implements OnInit {
  set_headline_de: string = 'Passwortänderung';
  set_header_de: string = 'Passwort erfolgreiche geändert';
  set_text_de: string = 'Du kannst dich nun wieder Einloggen';
  set_headline_en: string = 'Password change';
  set_header_en: string = 'Password successfully changed';
  set_text_en: string = 'You can now log in again';

  hide = true;
  confirm_email: Boolean = false;
  confirm_password: boolean = false;
  email!: string;
  password_correct: boolean = false;
  password_incorrect: string = '';
  emailerror = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  ]);
  password1 = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  password2 = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  formData: any;

  constructor(
    private router: Router,
    private as: AuthService,
    private dataService: DataService,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }

  getErrorMessagepassword1() {
    if (this.password1.hasError('required')) {
      return 'You must enter a value password ';
    }
    // Überprüfe, ob die E-Mail-Adresse gültig ist
    if (this.password1.hasError('pattern')) {
      return 'Not a valid password';
    }
    return '';
  }

  getErrorMessagepassword2() {
    if (this.password2.hasError('required')) {
      return 'You must enter a value password';
    }
    // Überprüfe, ob die E-Mail-Adresse gültig ist
    if (this.password2.hasError('pattern')) {
      return 'Not a valid password';
    }
    return '';
  }

  passwordConfirm() {
    if (
      this.password1.valid == true &&
      this.password2.valid == true &&
      this.password1.value == this.password2.value
    ) {
      this.password_incorrect = '';
      return true;
    }
    if (
      this.password1.valid == true &&
      this.password2.valid == true &&
      this.password1.value != this.password2.value
    ) {
      this.password_incorrect = 'Passwords are ok but don`t match';
      return false;
    } else {
      return false;
    }
  }

  submitForm() {
    this.password_correct = this.passwordConfirm();
    if (this.password_correct == true) {
      if (localStorage.getItem('language') == 'de') {
        this.dataService.setFormData({
          headline: this.set_headline_de,
          header: this.set_header_de,
          text: this.set_text_de,
        });
      } else {
        this.dataService.setFormData({
          headline: this.set_headline_en,
          header: this.set_header_en,
          text: this.set_text_en,
        });
      }
      let token: string | any = this.extractTokenFromURL();
      let password: string | any = this.password1.value;
      this.as.resetPasswordSave(password, token);
      this.router.navigate(['/completely']);
    }
  }

  extractTokenFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
  }
}
