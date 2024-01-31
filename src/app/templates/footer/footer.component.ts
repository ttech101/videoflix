import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  language_button: string = '';

  constructor(public translate: TranslateService) {}
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    this.checkLanguage(language);
  }

  checkLanguage(language: string) {
    if (language == 'en') {
      this.language_button = 'English';
    }
    if (language == 'de') {
      this.language_button = 'Deutsch';
    }
  }

  changeLanguage(language: string) {
    this.checkLanguage(language);
    localStorage.setItem('language', language);
    this.translate.use(language);
  }
}
