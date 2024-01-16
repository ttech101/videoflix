import { Component } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { SlideshowComponent } from '../../module/slideshow/slideshow.component';
import { CategoryHeaderComponent } from '../../module/category/category-header/category-header.component';
import { CategoryContentComponent } from '../../module/category/category-content/category-content.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    SlideshowComponent,
    CategoryHeaderComponent,
    CategoryContentComponent,
  ],
})
export class HomeComponent {}
