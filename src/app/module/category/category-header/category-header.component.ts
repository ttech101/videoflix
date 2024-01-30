import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './category-header.component.html',
  styleUrl: './category-header.component.scss',
})
export class CategoryHeaderComponent implements OnInit {
  constructor(public translate: TranslateService) {}
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }
}
