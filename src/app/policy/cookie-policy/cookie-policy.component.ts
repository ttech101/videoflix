import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../templates/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  templateUrl: './cookie-policy.component.html',
  styleUrl: './cookie-policy.component.scss',
  imports: [FooterComponent, TranslateModule],
})
export class CookiePolicyComponent implements OnInit {
  constructor(public translate: TranslateService) {}
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }
}
