import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../templates/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-imprint',
  standalone: true,
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
  imports: [FooterComponent, TranslateModule, MatButtonModule, CommonModule],
})
export class ImprintComponent implements OnInit {
  constructor(public translate: TranslateService, private location: Location) {}
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }
  goBack() {
    this.location.back();
  }
}
