import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-for-you',
  standalone: true,
  imports: [],
  templateUrl: './category-for-you.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryForYouComponent {
  constructor(private router: Router) {}

  showMovie(url: string) {
    this.router.navigateByUrl('/' + url);
  }
}
