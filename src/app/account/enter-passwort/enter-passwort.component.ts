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
  ],
})
export class EnterPasswortComponent {
  hide = true;
  formData: any;
  email!: string;

  constructor(
    private router: Router,
    private dataService: DataService,
    private location: Location
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
}
