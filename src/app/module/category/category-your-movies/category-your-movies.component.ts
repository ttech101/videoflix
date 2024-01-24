import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-your-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-your-movies.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryYourMoviesComponent {
  constructor(private as: AuthService) {}
  data: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('my');
  }
}
