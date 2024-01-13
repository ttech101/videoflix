import { Component } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { SlideshowComponent } from '../../module/slideshow/slideshow.component';
import { CategoryComponent } from '../../module/category/category.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    SlideshowComponent,
    CategoryComponent,
  ],
})
export class HomeComponent {}
