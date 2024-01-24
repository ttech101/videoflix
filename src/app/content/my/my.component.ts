import { Component } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my',
  standalone: true,
  templateUrl: './my.component.html',
  styleUrl: './my.component.scss',
  imports: [HeaderComponent, FooterComponent, CommonModule],
})
export class MyComponent {
  constructor(private as: AuthService) {}
  data: any = [];
  key: string = '';

  async ngOnInit() {
    this.data = await this.as.loadPreview('my');
  }
}
