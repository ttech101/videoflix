import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-series.component.html',
  styleUrl: '../content-box.scss',
})
export class CategorySeriesComponent {
  constructor(private as: AuthService) {}
  data: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('serie');
  }
}
