import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-category-nature',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './category-nature.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryNatureComponent {
  constructor(private as: AuthService) {}
  data: any = [];
  loading = true;

  async ngOnInit() {
    this.data = await this.as.loadPreview('nature');
    this.loading = false;
  }
}
