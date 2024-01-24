import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category-knowledge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-knowledge.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryKnowledgeComponent {
  constructor(private as: AuthService) {}
  data: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('knowledge');
  }
}
