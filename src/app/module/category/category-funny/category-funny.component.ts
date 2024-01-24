import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-funny',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-funny.component.html',
  styleUrl: '../content-box.scss',
})
export class CategoryFunnyComponent {
  constructor(private as: AuthService) {}
  data: any = [];

  async ngOnInit() {
    this.data = await this.as.loadPreview('funny');
  }
}
