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
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

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
    CommonModule,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    public translate: TranslateService,
    private as: AuthService
  ) {}
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }
  check_email: boolean = false;
  guest_token: string = '627e5287993530c19ca2f35604ff78c0539ee76f';
  email: string | any = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  ]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value email';
    }
    if (this.email.hasError('pattern')) {
      return 'Not a valid email';
    }
    console.log('!!!');
    return '123';
  }
  async submitForm() {
    if (this.email.status == 'VALID') {
      if (!(await this.checkMail())) {
        this.dataService.setFormData({ email: this.email.value });
        this.router.navigate(['/register']);
      }
    }
  }

  async checkMail(): Promise<boolean> {
    let checkMail: string | any = await this.as.checkEmail(this.email.value);
    if (checkMail.user_exists == true) {
      this.check_email = true;
      return true;
    } else {
      this.check_email = false;
      return false;
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
