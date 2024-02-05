import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../templates/footer/footer.component';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    FooterComponent,
    TranslateModule,
    CommonModule,
  ],
})
export class LoginComponent {
  check_email: boolean = false;
  emailFormControl: string | any = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  ]);
  formData: any;
  email!: string | any;

  constructor(
    public router: Router,
    private dataService: DataService,
    private location: Location,
    public translate: TranslateService,
    private as: AuthService
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

  async checkMail(): Promise<boolean> {
    let checkMail: string | any = await this.as.checkEmail(
      this.emailFormControl.value
    );
    if (checkMail.user_exists == true) {
      this.check_email = false;

      return true;
    } else {
      this.check_email = true;
      return false;
    }
  }

  async submitForm() {
    if (this.emailFormControl.valid) {
      if (await this.checkMail()) {
        this.dataService.setFormData({ email: this.emailFormControl.value });
        this.router.navigate(['/enter-passwort']);
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
