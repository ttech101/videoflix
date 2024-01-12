import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
}
