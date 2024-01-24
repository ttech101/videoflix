import { Component } from '@angular/core';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { environment } from '../../../environments/environment';

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
  ],
  providers: [AuthService],
})
export class EnterPasswortComponent {
  hide = true;
  formData: any;
  email!: string;
  password: string = '';
  passwordForm = new FormControl('', [Validators.required]);

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
    try {
      let resp: any = await this.as.loginWithEmailAndPassword(
        this.email,
        password
      );
      localStorage.setItem('authToken', resp.token);
      localStorage.setItem('name', resp.name);
      sessionStorage.setItem('account', 'true');
      localStorage.setItem('avatar', environment.apiUrl + resp.avatar_path);
      this.router.navigateByUrl('/home');
    } catch (e) {
      console.log(e);
    }
  }
}
