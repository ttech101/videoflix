import { Component } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-nature',
  standalone: true,
  templateUrl: './nature.component.html',
  styleUrl: './nature.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    MatProgressBarModule,
    TranslateModule,
  ],
})
export class NatureComponent {
  constructor(private as: AuthService, public translate: TranslateService) {}
  loading = true;

  data: any = [];
  key: string = '';

  async ngOnInit() {
    this.data = await this.as.loadPreview('nature');
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    this.loading = false;
  }
}
