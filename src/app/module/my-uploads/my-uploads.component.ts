import { Component, Inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface PeriodicElement {
  cover: string;
  movie_name: string;
  created_at: string;
  genre: string;
  convert_status: string;
  change: string;
  delete: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    movie_name: '',
    cover: '',
    created_at: '',
    genre: '',
    convert_status: '',
    change: '',
    delete: '',
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
    TranslateModule,
  ],
})
export class MyUploadsComponent implements OnInit {
  constructor(
    private as: AuthService,
    public dialog: MatDialog,
    private router: Router,
    public translate: TranslateService
  ) {}
  data: any = [];
  key: string = '';
  displayedColumns: string[] = [
    'movie_name',
    'cover',
    'created_at',
    'genre',
    'convert_status',
    'change',
    'delete',
  ];
  dataSource = this.data;

  async ngOnInit() {
    this.data = await this.as.loadPreview('my-uploads');
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    this.dataSource = this.data;
    this.displayedColumns = [
      'movie_name',
      'cover',
      'created_at',
      'genre',
      'convert_status',
      'change',
      'delete',
    ];
  }

  changeMovie(element: any) {
    this.router.navigate(['/edit-video'], {
      queryParams: { select: element },
    });
  }

  deleteMovie(key: string, movie_name: string): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      data: { key: key, movie_name: movie_name },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  openDialogConvert() {
    const dialogRef = this.dialog.open(DialogConvert);
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
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
    HttpClientModule,
    TranslateModule,
  ],
  providers: [AuthService],
})
export class DialogAnimationsExampleDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private as: AuthService,
    private location: Location,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }

  key = this.data.key;
  movie_name = this.data.movie_name;

  async deleteMovie() {
    await this.as.deleteVideo(this.key);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-convert.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class DialogConvert implements OnInit {
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }
}
