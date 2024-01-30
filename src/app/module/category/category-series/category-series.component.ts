import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category-series',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, TranslateModule],
  templateUrl: './category-series.component.html',
  styleUrl: '../content-box.scss',
})
export class CategorySeriesComponent {
  constructor(private as: AuthService, public translate: TranslateService) {}
  data: any = [];
  loading = true;

  async ngOnInit() {
    this.data = await this.as.loadPreview('serie');
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    this.loading = false;
  }
}
