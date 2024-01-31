import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../templates/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
  imports: [FooterComponent, TranslateModule, MatButtonModule],
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(public translate: TranslateService, private location: Location) {}
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }
  goBack() {
    this.location.back();
  }
}
