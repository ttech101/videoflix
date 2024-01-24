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
  ],
})
export class RestPasswortComponent {
  set_headline: string = '';
  set_header: string = 'Bestätigungs E-Mail gesendet';
  set_text: string =
    'Bitte prüfe dein E-Mail Postfach. Der Link zum Passwort zurücksetzen wurde gesendet.';
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
    private as: AuthService
  ) {}

  ngOnInit() {
    const formData = this.dataService.getFormData();
    this.formData = formData;
    if (formData && formData.email) {
      this.email = formData.email;
      this.emailFormControl.setValue(this.email);
    }
  }

  async submitForm() {
    if (this.emailFormControl.valid) {
      this.dataService.setFormData({
        email: this.emailFormControl.value,
        headline: this.set_headline,
        header: this.set_header,
        text: this.set_text,
      });
      let email: string | any = this.emailFormControl.value;
      try {
        await this.as.resetPassword(email);
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
