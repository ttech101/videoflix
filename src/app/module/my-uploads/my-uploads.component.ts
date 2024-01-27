import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DecimalPipe } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  cover: string;
  movie_name: string;
  created_at: string;
  genre: string;
  // button: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    movie_name: '1',
    cover: 'Hydrogen',
    created_at: '1.0079',
    genre: 'H',
    // button: 'Hier drücken',
  },
  { movie_name: '2', cover: 'Helium', created_at: '4.0026', genre: 'He' },
  // { movie_name: '3', cover: 'Lithium', created_at: 6.941, genre: 'Li' },
  // { movie_name: '4', cover: 'Beryllium', created_at: 9.0122, genre: 'Be' },
  // { movie_name: '5', cover: 'Boron', created_at: 10.811, genre: 'B' },
  // { movie_name: '6', cover: 'Carbon', created_at: 12.0107, genre: 'C' },
  // { movie_name: '7', cover: 'Nitrogen', created_at: 14.0067, genre: 'N' },
  // { movie_name: '8', cover: 'Oxygen', created_at: 15.9994, genre: 'O' },
  // { movie_name: '9', cover: 'Fluorine', created_at: 18.9984, genre: 'F' },
  // { movie_name: '10', cover: 'Neon', created_at: 20.1797, genre: 'Ne' },
];

@Component({
  selector: 'app-my-uploads',
  standalone: true,
  templateUrl: './my-uploads.component.html',
  styleUrl: './my-uploads.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class MyUploadsComponent implements OnInit {
  constructor(private as: AuthService) {}
  data: any = [];
  key: string = '';
  displayedColumns: string[] = ['movie_name', 'cover', 'created_at', 'genre'];
  dataSource = this.data;

  async ngOnInit() {
    this.data = await this.as.loadPreview('my');
    console.log('this.data:', this.data);
    console.log('Elementdata:', ELEMENT_DATA);
    this.dataSource = this.data;
  }
}
