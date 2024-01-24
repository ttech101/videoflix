import { Component } from '@angular/core';

import { CategoryNewMoviesComponent } from '../category-new-movies/category-new-movies.component';

import { CategoryMoviesComponent } from '../category-movies/category-movies.component';
import { CategorySeriesComponent } from '../category-series/category-series.component';
import { CategoryYourMoviesComponent } from '../category-your-movies/category-your-movies.component';

import { CategoryNatureComponent } from '../category-nature/category-nature.component';
import { CategoryFunnyComponent } from '../category-funny/category-funny.component';
import { CategoryKnowledgeComponent } from '../category-knowledge/category-knowledge.component';

@Component({
  selector: 'app-category-content',
  standalone: true,
  templateUrl: './category-content.component.html',
  styleUrl: './category-content.component.scss',
  imports: [
    CategoryNewMoviesComponent,
    CategoryMoviesComponent,
    CategorySeriesComponent,
    CategoryYourMoviesComponent,
    CategoryNatureComponent,
    CategoryFunnyComponent,
    CategoryKnowledgeComponent,
  ],
})
export class CategoryContentComponent {}
