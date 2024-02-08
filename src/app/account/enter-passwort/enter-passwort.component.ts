import { Component } from '@angular/core';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { CommonModule, Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { environment } from '../../../environments/environment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-enter-passwort',
  standalone: true,
  templateUrl: './enter-passwort.component.html',
  styleUrl: './enter-passwort.component.scss',
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
    CommonModule,
  ],
  providers: [AuthService],
})
export class EnterPasswortComponent {
  hide = true;
  formData: any;
  email!: string;
  rest_form: boolean = false;
  password: string = '';
  password_wrong: boolean = false;
  passwordForm = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private dataService: DataService,
    private location: Location,
    private as: AuthService,
    public translate: TranslateService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const formData = this.dataService.getFormData();
    this.formData = formData;
    if (formData && formData.email) {
      this.email = formData.email;
    }
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    if (this.email == null) {
      this.rest_form = true;
    }
    if (this.email == null) {
      this.router.navigate(['/login']);
    }
  }

  changeMail() {
    this.dataService.setFormData({ email: this.email });
    this.router.navigate(['/login']);
  }

  resetPasswort() {
    this.dataService.setFormData({ email: this.email });
    this.router.navigate(['/reset-passwort']);
  }

  goBack() {
    this.location.back();
  }

  async login() {
    let password = this.passwordForm.value;
    let autoplay: any;

    try {
      let resp: any = await this.as.loginWithEmailAndPassword(
        this.email,
        password
      );
      if (resp.autoplay == 'true') {
        autoplay = 'True';
      } else {
        autoplay = 'False';
      }
      localStorage.setItem('authToken', resp.token);
      localStorage.setItem('name', resp.name);
      localStorage.setItem('autoplay', autoplay);
      localStorage.setItem('language', resp.language);
      localStorage.setItem('cookie_accept', 'true');
      sessionStorage.setItem('account', 'true');
      localStorage.setItem('avatar', environment.apiUrl + resp.avatar_path);
      this.router.navigateByUrl('/home');
    } catch (e) {
      this.password_wrong = true;
      console.log(e);
    }
  }
}
