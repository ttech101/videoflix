import { Component } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-serch',
  standalone: true,
  templateUrl: './serch.component.html',
  styleUrl: './serch.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class SerchComponent {}
