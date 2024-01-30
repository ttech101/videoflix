import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category-movies',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, TranslateModule],
  templateUrl: './category-movies.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryMoviesComponent implements OnInit {
  constructor(private as: AuthService, public translate: TranslateService) {}
  loading = true;
  data: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('movie');
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    this.loading = false;
  }
}
