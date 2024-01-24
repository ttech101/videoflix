import { Component } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    CommonModule,
    FormsModule,
  ],
})
export class SerchComponent {
  constructor(private as: AuthService) {}
  data: any = [];
  key: string = '';
  filteredData: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('all');
    this.filteredData = this.data;
  }

  filterData() {
    if (this.key) {
      this.filteredData = this.data.filter((item: any) =>
        item.movie_name.toLowerCase().includes(this.key.toLowerCase())
      );
    } else {
      // Wenn das Suchfeld leer ist, zeige alle Daten an
      this.filteredData = this.data;
    }
  }
}
