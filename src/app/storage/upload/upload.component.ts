import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
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
  uploadForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    // Initialize the form in the constructor
    this.uploadForm = this.formBuilder.group({
      movie_name: ['', Validators.required],
      description_short: ['', Validators.required],
      description: [''],
      author: ['', Validators.required],
      date_from: [new Date(), Validators.required],
      video_length: ['', Validators.required],
      movie_check: ['', Validators.required],
      genre: ['', Validators.required],
      selectedAge: ['', Validators.required],
    });
  }

  upload_visible_check = false;
  requiredFileType: string | undefined;
  fileName = '';
  uploadProgress: number | any;
  uploadSub: Subscription | any;

  submitUpload() {
    console.log(this.uploadForm);
    if (this.uploadForm.valid) {
      // Gather the form data
      const formData = this.uploadForm.value;

      // You can now use formData to send data to your backend or perform other actions
      // console.log(formData);
    } else {
      // Form is invalid, show an error or perform other actions
      // console.log('Form is invalid. Please fill in all required fields.');
    }
  }

  onFileSelectedThumbnail(event: any) {
    const file: File = event.target.files[0];
    let url = 'https://0fa7222c-0431-41e7-97fb-ecf4991ffc01.mock.pstmn.io/';
    let api_format = 'speichern';
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);

      const upload$ = this.http
        .post(url + api_format, formData, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(finalize(() => this.reset()));

      this.uploadSub = upload$.subscribe(
        (event: any) => {
          document.getElementById('thumbnail-progress')?.classList.remove('dn');
          document.getElementById('video-progress')?.classList.remove('dn');
          document.getElementById('nocheck_thumbnail')?.classList.add('dn');
          document.getElementById('check_thumbnail')?.classList.add('dn');
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total)
            );
          }
          if (event.type === HttpEventType.Response) {
            if (event.body.status === 'success') {
              document
                .getElementById('check_thumbnail')
                ?.classList.remove('dn');
              console.log('Serverantwort:', event.body);
            }
          }
        },
        (error) => {
          document.getElementById('nocheck_thumbnail')?.classList.remove('dn');
          document.getElementById('check_thumbnail')?.classList.add('dn');
          console.error('Fehler bei der Serveranfrage:', error);
        }
      );
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
