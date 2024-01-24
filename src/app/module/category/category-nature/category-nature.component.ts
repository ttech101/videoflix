import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-nature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-nature.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryNatureComponent {
  constructor(private as: AuthService) {}
  data: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('nature');
  }
}
