import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-category-your-movies',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './category-your-movies.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryYourMoviesComponent {
  constructor(private as: AuthService) {}
  data: any = [];
  loading = true;

  async ngOnInit() {
    this.data = await this.as.loadPreview('my');
    this.loading = false;
  }
}
