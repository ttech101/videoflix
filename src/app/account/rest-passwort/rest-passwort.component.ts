import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from '../../templates/footer/footer.component';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rest-passwort',
  standalone: true,
  templateUrl: './rest-passwort.component.html',
  styleUrl: './rest-passwort.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class RestPasswortComponent {
  set_headline_de: string = '';
  set_header_de: string = 'Bestätigungs-E-Mail gesendet';
  set_text_de: string =
    'Bitte prüfe dein E-Mail Postfach. Der Link zum Passwort zurücksetzen wurde gesendet.';
  set_headline_en: string = '';
  set_header_en: string = 'Confirmation e-mail sent';
  set_text_en: string =
    'Please check your e-mail inbox. The link to reset your password has been sent.';
  formData: any;
  error_message: string = '';
  email!: string | any;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  ]);

  constructor(
    private router: Router,
    private dataService: DataService,
    private location: Location,
    private as: AuthService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    const formData = this.dataService.getFormData();
    this.formData = formData;
    if (formData && formData.email) {
      this.email = formData.email;
      this.emailFormControl.setValue(this.email);
    }
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }

  async submitForm() {
    if (this.emailFormControl.valid) {
      if (localStorage.getItem('language') == 'de') {
        this.dataService.setFormData({
          email: this.emailFormControl.value,
          headline: this.set_headline_de,
          header: this.set_header_de,
          text: this.set_text_de,
        });
      } else {
        this.dataService.setFormData({
          email: this.emailFormControl.value,
          headline: this.set_headline_en,
          header: this.set_header_en,
          text: this.set_text_en,
        });
      }
      let email: string | any = this.emailFormControl.value;
      try {
        await this.as.resetPassword(email);
        this.router.navigate(['/completely']);
      } catch (e: any) {
        this.error_message = e.error.error;
        console.log(this.error_message);
      }
    }
  }
  goBack() {
    this.location.back();
  }
}
