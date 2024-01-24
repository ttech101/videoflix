import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    HttpClientModule,
    MatProgressBarModule,
    CommonModule,
  ],
})
export class UploadComponent {
  @Input()
  movie_name: string = '';
  description_short: string = '';
  description: string = '';
  author: string = '';
  date_from: Date | any = '';
  video_length: String = '';

  movie_check = false;
  short_movie_check = false;
  nature_check = false;
  funny_check = false;
  knowledge_check = false;
  other_check = false;
  selectedAge?: number | any;
  upload_visible_check = false;

  valueText: string = '';
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  indeterminate = false;
  requiredFileType: string | undefined;
  fileName = '';
  uploadProgress: number | any;
  uploadSub: Subscription | any;

  constructor(private http: HttpClient) {}

  submitUpload() {}

  changeSelected(age: number) {
    this.selectedAge = age;
  }

  onFileSelected(event: any) {
    // Das muss später noch kopiert werden für das video
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);

      const upload$ = this.http
        .post('/api/thumbnail-upload', formData, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(finalize(() => this.reset()));

      this.uploadSub = upload$.subscribe((event: any) => {
        document.getElementById('thumbnail-progress')?.classList.remove('dn');
        document.getElementById('video-progress')?.classList.remove('dn');
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      });
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
