import { Component } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-funny',
  standalone: true,
  templateUrl: './funny.component.html',
  styleUrl: './funny.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    MatProgressBarModule,
  ],
})
export class FunnyComponent {
  constructor(private as: AuthService) {}
  loading = true;
  data: any = [];
  key: string = '';

  async ngOnInit() {
    this.data = await this.as.loadPreview('funny');
    this.loading = false;
  }
}
