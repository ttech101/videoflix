import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-category-knowledge',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, TranslateModule],
  templateUrl: './category-knowledge.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryKnowledgeComponent {
  constructor(private as: AuthService, public translate: TranslateService) {}
  loading = true;
  data: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('knowledge');
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    this.loading = false;
  }
}
