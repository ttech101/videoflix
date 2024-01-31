import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-movies',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './new-movies.component.html',
  styleUrl: './new-movies.component.scss',
})
export class NewMoviesComponent implements OnInit {
  constructor(public translate: TranslateService) {}
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }
}
