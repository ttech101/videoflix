import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }
  guest_token: string = '627e5287993530c19ca2f35604ff78c0539ee76f';
  email = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  ]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    // Überprüfe, ob die E-Mail-Adresse gültig ist
    if (this.email.hasError('pattern')) {
      return 'Not a valid email';
    }
    return '';
  }
  submitForm() {
    if (this.email.status == 'VALID') {
      this.dataService.setFormData({ email: this.email.value });
      this.router.navigate(['/register']);
    }
  }

  loginGuest() {
    localStorage.setItem('authToken', this.guest_token);
    this.router.navigate(['/home']);
  }

  loginUser() {
    this.router.navigate(['/login']);
  }
}
