import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface PeriodicElement {
  cover: string;
  movie_name: string;
  created_at: string;
  genre: string;
  change: string;
  delete: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    movie_name: '1',
    cover: 'Hydrogen',
    created_at: '1.0079',
    genre: 'H',
    change: 'Hier drücken',
    delete: 'Und hier',
  },
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
  constructor(private as: AuthService, public dialog: MatDialog) {}
  data: any = [];
  key: string = '';
  displayedColumns: string[] = [
    'movie_name',
    'cover',
    'created_at',
    'genre',
    'change',
    'delete',
  ];
  dataSource = this.data;

  async ngOnInit() {
    this.data = await this.as.loadPreview('my');
    console.log('this.data:', this.data);
    this.dataSource = this.data;
    this.displayedColumns = [
      'movie_name',
      'cover',
      'created_at',
      'genre',
      'change',
      'delete',
    ];
  }

  changeMovie(element: any) {
    console.log('change:', element);
  }

  deleteMovie(key: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
    });
  }

  // async deleteMovie(element: any) {

  //   await this.as.deleteVideo(element);
  //   this.ngOnInit();
  // }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-delete.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}
