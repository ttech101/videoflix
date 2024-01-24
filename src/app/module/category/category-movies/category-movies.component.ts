import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-movies.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryMoviesComponent implements OnInit {
  constructor(private as: AuthService) {}
  data: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('movie');
  }
}
