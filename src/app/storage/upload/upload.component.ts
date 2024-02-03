import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Subscription, finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    HttpClientModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
  ],
  providers: [AuthService],
})
export class UploadComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private as: AuthService,
    public dialog: MatDialog,
    private router: Router,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
  }
  uploadForm = new FormGroup({
    movie_name: new FormControl<string>('', [Validators.required]),
    description_short: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    author: new FormControl<string>('', [Validators.required]),
    date_from: new FormControl(new Date()),
    video_length: new FormControl<string>('00:00'),
    movie_check: new FormControl<boolean>(false, [Validators.required]),
    genre: new FormControl<string>('', [Validators.required]),
    selectedAge: new FormControl<string>('0', [Validators.required]),
    upload_visible_check: new FormControl<boolean>(false),
  });

  fileNameThumbnail = '';
  fileNameImage = '';
  fileNameVideo = '';
  uploadProgressThumbnail: number | any;
  uploadProgressImage: number | any;
  uploadProgressVideo: number | any;
  uploadSubThumbnail: Subscription | any;
  uploadSubImage: Subscription | any;
  uploadSubVideo: Subscription | any;
  thumbnail_ok: boolean = false;
  image_ok: boolean = false;
  video_ok: boolean = false;
  upload_key: boolean | any = false;
  key: any;
  errorThumbnail: string = '';
  errorImage: string = '';
  errorVideo: string = '';

  async loadKey() {
    if (this.uploadForm.valid && !this.upload_key) {
      this.upload_key = true;
      const key: any = await this.as.loadUploadKey();
      this.key = key.random_key;
      console.log(this.upload_key, this.key);
    }
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
    this.submitUpload();
  }

  async submitUpload() {
    console.log(
      this.thumbnail_ok && this.image_ok && this.video_ok,
      this.checkAllUploads()
    );
    if (this.uploadForm.valid && this.checkAllUploads()) {
      await this.as.saveVideoData(this.uploadForm.value, this.key);
      this.router.navigateByUrl('/my');
    } else {
      this.openDialog();
    }
  }

  checkAllUploads() {
    if (this.thumbnail_ok && this.image_ok && this.video_ok) {
      return true;
    } else {
      return false;
    }
  }

  onFileSelectedThumbnail(event: any) {
    document.getElementById('error_thumbnail')?.classList.add('dn');
    const file: File = event.target.files[0];
    let url = this.as.loadEnvironment() + '/upload_movie/';
    if (file) {
      this.fileNameThumbnail = file.name;
      const formData = new FormData();
      formData.append('cover', file);
      formData.append('upload_key', this.key);
      const upload$ = this.http
        .post(url, formData, { reportProgress: true, observe: 'events' })
        .pipe(finalize(() => this.resetThumbnail()));

      this.uploadSubThumbnail = upload$.subscribe(
        (event: any) => {
          document.getElementById('thumbnail-progress')?.classList.remove('dn');
          document.getElementById('nocheck_thumbnail')?.classList.add('dn');
          document.getElementById('check_thumbnail')?.classList.add('dn');
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgressThumbnail = Math.round(
              100 * (event.loaded / event.total)
            );
            console.log(this.uploadProgressThumbnail);
          }
          if (event.type === HttpEventType.Response) {
            if (event.body.status === 'success') {
              document
                .getElementById('check_thumbnail')
                ?.classList.remove('dn');
              console.log('Serverantwort:', event.body);
              this.thumbnail_ok = true;
              console.log(this.uploadProgressThumbnail);
            }
          }
        },
        (error) => {
          document.getElementById('nocheck_thumbnail')?.classList.remove('dn');
          document.getElementById('check_thumbnail')?.classList.add('dn');
          document.getElementById('error_thumbnail')?.classList.remove('dn');
          this.errorThumbnail = error.error.replace(/[\[\]']/g, '');
        }
      );
    }
  }
  cancelUploadThumbnail() {
    this.uploadSubThumbnail.unsubscribe();
    this.resetThumbnail();
  }
  resetThumbnail() {
    this.uploadProgressThumbnail = null;
    this.uploadSubThumbnail = null;
  }

  onFileSelectedImage(event: any) {
    document.getElementById('error_image')?.classList.add('dn');
    const file: File = event.target.files[0];
    let url = this.as.loadEnvironment() + '/upload_movie/';
    if (file) {
      this.fileNameImage = file.name;
      const formData = new FormData();
      formData.append('image', file);
      formData.append('upload_key', this.key);
      const upload$ = this.http
        .post(url, formData, { reportProgress: true, observe: 'events' })
        .pipe(finalize(() => this.resetImage()));

      this.uploadSubImage = upload$.subscribe(
        (event: any) => {
          document.getElementById('image-progress')?.classList.remove('dn');
          document.getElementById('nocheck_image')?.classList.add('dn');
          document.getElementById('check_image')?.classList.add('dn');
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgressImage = Math.round(
              100 * (event.loaded / event.total)
            );
          }
          if (event.type === HttpEventType.Response) {
            if (event.body.status === 'success') {
              document.getElementById('check_image')?.classList.remove('dn');
              console.log('Serverantwort:', event.body);
              this.image_ok = true;
            }
          }
        },
        (error) => {
          document.getElementById('nocheck_image')?.classList.remove('dn');
          document.getElementById('check_image')?.classList.add('dn');
          document.getElementById('error_image')?.classList.remove('dn');
          this.errorImage = error.error.replace(/[\[\]']/g, '');
        }
      );
    }
  }
  cancelUploadImage() {
    this.uploadSubImage.unsubscribe();
    this.resetImage();
  }
  resetImage() {
    this.uploadProgressImage = null;
    this.uploadSubImage = null;
  }
  onFileSelectedVideo(event: any) {
    document.getElementById('error_video')?.classList.add('dn');
    const file: File = event.target.files[0];
    let url = this.as.loadEnvironment() + '/upload_movie/';
    if (file) {
      this.fileNameVideo = file.name;
      const formData = new FormData();
      formData.append('video', file);
      formData.append('upload_key', this.key);
      const upload$ = this.http
        .post(url, formData, { reportProgress: true, observe: 'events' })
        .pipe(finalize(() => this.resetVideo()));

      this.uploadSubVideo = upload$.subscribe(
        (event: any) => {
          document.getElementById('video-progress')?.classList.remove('dn');
          document.getElementById('nocheck_video')?.classList.add('dn');
          document.getElementById('check_video')?.classList.add('dn');
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgressVideo = Math.round(
              100 * (event.loaded / event.total)
            );
          }
          if (event.type === HttpEventType.Response) {
            if (event.body.status === 'success') {
              document.getElementById('check_video')?.classList.remove('dn');
              console.log('Serverantwort:', event.body);
              this.video_ok = true;
            }
          }
        },
        (error) => {
          document.getElementById('nocheck_video')?.classList.remove('dn');
          document.getElementById('check_video')?.classList.add('dn');
          document.getElementById('error_video')?.classList.remove('dn');
          this.errorVideo = error.error.replace(/[\[\]']/g, '');
        }
      );
    }
  }
  cancelUploadVideo() {
    this.uploadSubVideo.unsubscribe();
    this.resetVideo();
  }
  resetVideo() {
    this.uploadProgressVideo = null;
    this.uploadSubVideo = null;
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './status.dialog.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class DialogElementsExampleDialog {}
