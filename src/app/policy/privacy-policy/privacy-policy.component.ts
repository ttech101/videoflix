import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../templates/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
  imports: [FooterComponent, TranslateModule],
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(public translate: TranslateService) {}
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }
}
