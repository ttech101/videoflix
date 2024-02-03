import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../service/data.service';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [
    FooterComponent,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
  ],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  set_headline_de: string = '3. SCHRITT';
  set_header_de: string = 'Bestätige deine E-Mail';
  set_text_de: string =
    'Bitte prüfe dein E-Mail Postfach und bestätige den darinenhaltenen Link.';
  set_headline_en: string = '3. STEP';
  set_header_en: string = 'Confirm your e-mail';
  set_text_en: string =
    'Please check your e-mail inbox and confirm the link contained therein.';
  hide = true;
  confirm_email: Boolean = false;
  confirm_password: boolean = false;
  email!: string;
  password_correct: boolean = false;
  password_incorrect: string = '';
  emailerror: any = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  ]);
  password1: any = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  password2: any = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  formData: any;
  name: any = new FormControl('');

  constructor(
    private router: Router,
    private dataService: DataService,
    private as: AuthService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    const formData = this.dataService.getFormData();
    this.formData = formData;
    if (formData && formData.email) {
      this.email = formData.email;
      this.emailerror.setValue(this.email);
    } else {
      this.changeEmail();
    }
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }

  changeEmail() {
    document.getElementById('email-input-none')?.classList.add('dn');
    document.getElementById('email-input')?.classList.remove('dn');
  }
  getErrorMessageEmail() {
    if (this.emailerror.hasError('required')) {
      return 'You must enter a value';
    }
    // Überprüfe, ob die E-Mail-Adresse gültig ist
    if (this.emailerror.hasError('pattern')) {
      return 'Not a valid email';
    }
    this.confirm_email = true;
    return '';
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

  async submitForm() {
    this.password_correct = this.passwordConfirm();
    if (this.emailerror.valid == true && this.password_correct == true) {
      if (localStorage.getItem('language') == 'de') {
        this.dataService.setFormData({
          email: this.email,
          headline: this.set_headline_de,
          header: this.set_header_de,
          text: this.set_text_de,
        });
      } else {
        this.dataService.setFormData({
          email: this.email,
          headline: this.set_headline_en,
          header: this.set_header_en,
          text: this.set_text_en,
        });
      }
      await this.register();
      this.router.navigate(['/completely']);
    }
  }

  async register() {
    try {
      let resp: any = await this.as.registerAccount(
        this.emailerror.value,
        this.password1.value,
        this.password2.value,
        this.name.value
      );
      localStorage.setItem('cookie_accept', 'true');
    } catch (e) {
      console.log(e);
    }
  }
}
