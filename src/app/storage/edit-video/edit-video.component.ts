import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-video',
  standalone: true,
  templateUrl: './edit-video.component.html',
  styleUrl: './edit-video.component.scss',
  imports: [
    HeaderComponent,
    MatSlideToggleModule,
    FooterComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    MatNativeDateModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
  ],
  providers: [AuthService],
})
export class EditVideoComponent implements OnInit {
  constructor(
    private as: AuthService,
    public dialog: MatDialog,
    private router: Router,
    public translate: TranslateService
  ) {}

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

  upload_key: boolean | any = false;
  key: any;
  check_video: string | any = '';

  async ngOnInit() {
    let paramsUrl = new URLSearchParams(document.location.search);
    this.key = paramsUrl.get('select');
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    let datas: any = await this.as.loadMovies(this.key);
    this.setUploadForm(datas);
  }

  setUploadForm(datas: any) {
    if (datas[0].movie_check) {
      this.check_video = 'movie';
    } else {
      this.check_video = 'serie';
    }
    this.uploadForm.setValue({
      movie_name: datas[0].movie_name || '',
      description_short: datas[0].description_short || '',
      description: datas[0].description || '',
      author: datas[0].author || '',
      date_from: datas[0].date_from || new Date(),
      video_length: datas[0].video_length || '00:00',
      movie_check: this.check_video,
      genre: datas[0].genre || '',
      selectedAge: (datas[0].age_rating || '0').toString(),
      upload_visible_check: datas[0].upload_visible_check || false,
    });
  }

  async loadKey() {
    if (this.uploadForm.valid && !this.upload_key) {
      this.upload_key = true;
      const key: any = await this.as.loadUploadKey();
      this.key = key.random_key;
    }
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
    this.submitUpload();
  }

  async submitUpload() {
    if (this.uploadForm.valid) {
      await this.as.changeVideoData(this.uploadForm.value, this.key);
      this.router.navigateByUrl('/my-uploads');
    }
  }
}
