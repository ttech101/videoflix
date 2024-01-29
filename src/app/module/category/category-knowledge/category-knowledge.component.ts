import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-category-knowledge',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './category-knowledge.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryKnowledgeComponent {
  constructor(private as: AuthService) {}
  loading = true;
  data: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('knowledge');
    this.loading = false;
  }
}
