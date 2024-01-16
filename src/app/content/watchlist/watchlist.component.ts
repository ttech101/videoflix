import { Component } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
  imports: [HeaderComponent, FooterComponent],
})
export class WatchlistComponent {}
