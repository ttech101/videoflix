import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-category-movies',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './category-movies.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryMoviesComponent implements OnInit {
  constructor(private as: AuthService) {}
  loading = true;
  data: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('movie');
    this.loading = false;
  }
}
