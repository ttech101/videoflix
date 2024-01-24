import { Component } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nature',
  standalone: true,
  templateUrl: './nature.component.html',
  styleUrl: './nature.component.scss',
  imports: [HeaderComponent, FooterComponent, CommonModule],
})
export class NatureComponent {
  constructor(private as: AuthService) {}
  data: any = [];
  key: string = '';

  async ngOnInit() {
    this.data = await this.as.loadPreview('nature');
  }
}
