import { Component } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    MatProgressBarModule,
    TranslateModule,
  ],
})
export class SerchComponent {
  constructor(private as: AuthService, public translate: TranslateService) {}
  loading = true;
  data: any = [];
  key: string = '';
  filteredData: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('all');
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    this.loading = false;
    this.filteredData = '';
  }

  filterData() {
    if (this.key) {
      this.filteredData = this.data.filter((item: any) =>
        item.movie_name.toLowerCase().includes(this.key.toLowerCase())
      );
    } else {
      // Wenn das Suchfeld leer ist, zeige alle Daten an
      this.filteredData = '';
    }
  }
}
