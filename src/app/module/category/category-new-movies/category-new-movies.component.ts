import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-category-new-movies',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './category-new-movies.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryNewMoviesComponent {
  loading = true;
  constructor(private as: AuthService) {}
  data: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('new');
    this.loading = false;
  }
}
