import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-completely',
  standalone: true,
  templateUrl: './completely.component.html',
  styleUrl: './completely.component.scss',
  imports: [FooterComponent, MatCardModule, MatButtonModule],
})
export class CompletelyComponent {}
