import { Component } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-series',
  standalone: true,
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    MatProgressBarModule,
  ],
})
export class SeriesComponent {
  constructor(private as: AuthService) {}
  loading = true;
  data: any = [];
  key: string = '';

  async ngOnInit() {
    this.data = await this.as.loadPreview('serie');
    this.loading = false;
  }
}
