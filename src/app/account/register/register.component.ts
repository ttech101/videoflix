import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
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
  ],
})
export class RegisterComponent implements OnInit {
  hide = true;
  hide1 = true;
  email!: string;
  emailerror = new FormControl('', [Validators.required, Validators.email]);
  passworterror1 = new FormControl('', [Validators.required, Validators.email]);
  passworterror2 = new FormControl('', [Validators.required, Validators.email]);
  formData: any;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    const formData = this.dataService.getFormData();
    this.formData = formData;
    if (formData && formData.email) {
      this.email = formData.email;
      this.emailerror.setValue(this.email);
    } else {
      this.changeEmail();
    }
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
    if (this.emailerror.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }
  getErrorMessagePasswort1() {
    if (this.passworterror1.hasError('required')) {
      return 'You must enter a value passwort';
    }
    // Überprüfe, ob die E-Mail-Adresse gültig ist
    if (this.passworterror1.hasError('passwort')) {
      return 'Not a valid passwort';
    }
    return '';
  }

  getErrorMessagePasswort2() {
    if (this.passworterror2.hasError('required')) {
      return 'You must enter a value passwort';
    }
    // Überprüfe, ob die E-Mail-Adresse gültig ist
    if (this.passworterror2.hasError('passwort')) {
      return 'Not a valid passwort';
    }
    return '';
  }

  submitForm() {
    console.log('hier?');
    console.log(this.formData);
    if (this.formData) {
      this.router.navigate(['/completely']);
    }
  }
}
