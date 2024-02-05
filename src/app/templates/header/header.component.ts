import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { ThemePalette } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { DataService } from '../../service/data.service';
import { AuthService } from '../../service/auth.service';
import {
  HttpClient,
  HttpClientModule,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { Subscription, finalize } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { environment } from '../../../environments/environment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input('mat-dialog-close')
  avatar_path: string | any;
  name: string | any = this.dataService.getUser();
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private dataService: DataService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    let path: any = localStorage.getItem('avatar');
    let avatar_null = path.match('null');
    if (avatar_null != 'null') {
      this.avatar_path = localStorage.getItem('avatar');
    } else {
      this.avatar_path = '/assets/img/woman-995164_640.png';
    }
    this.name = localStorage.getItem('name');
  }

  btnUpload(url: string) {
    this.router.navigateByUrl('/' + url);
  }
  openDialogDelete(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAnimationsDeleteDialog, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openDialogProfil(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DialogAnimationsProfilDialog, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((isi) => {
      if (this.dataService.save_profil) {
        this.name = this.dataService.name;
        this.avatar_path = this.dataService.avatar;
        this.dataService.save_profil = false;
      }
    });
  }

  openDialogKonto(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAnimationsKontoDialog, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  menuLogout() {
    let language: string | any = localStorage.getItem('language');
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
    localStorage.setItem('language', language);
    localStorage.setItem('cookie_accept', 'true');
  }

  openMyUploads() {
    this.router.navigateByUrl('/my-uploads');
  }
}

@Component({
  selector: 'dialog-delete-account',
  templateUrl: 'dialog/delete-account.html',
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
export class DialogAnimationsDeleteDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsDeleteDialog>,
    private as: AuthService,
    private router: Router,
    public translate: TranslateService
  ) {}
  guest: boolean = false;
  ngOnInit(): void {
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    this.checkGuest();
  }

  async deleteAccount() {
    let token: string | any = localStorage.getItem('authToken');
    await this.as.deleteUser(token);
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  checkGuest() {
    let name = localStorage.getItem('name');
    if (name == 'Guest') {
      this.guest = true;
    } else {
      this.guest = false;
    }
    console.log(this.guest);
  }
}

@Component({
  selector: 'dialog-profil-account',
  templateUrl: 'dialog/profil-account.html',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDividerModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    TranslateModule,
  ],
  providers: [AuthService],
  styleUrl: './dialog/dialog.style.scss',
})
export class DialogAnimationsProfilDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsProfilDialog>,
    private as: AuthService,
    private http: HttpClient,
    private dataService: DataService,
    public translate: TranslateService
  ) {}

  @Input()
  color: ThemePalette = 'accent';
  name?: string | any;
  isChecked?: boolean | any;
  selectedAge?: number | any;
  selected_language: string | any;
  requiredFileType: string | undefined;
  fileName = '';
  uploadProgress: number | any = 100;
  uploadSub: Subscription | any;
  avatar_path: string | any = localStorage.getItem('avatar');
  avatar_info: string = '';
  guest: boolean = false;

  async ngOnInit() {
    console.log(await this.as.loadProfilData());
    let data: string | any = await this.as.loadProfilData();
    this.name = data.name;
    this.selected_language = data.language;
    this.isChecked = data.automatic_playback;
    this.selectedAge = data.age_rating;
    localStorage.setItem('name', data.name);
    localStorage.setItem('language', this.selected_language);
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    this.checkGuest();
    this.checkAvatar();
  }

  checkAvatar() {
    let avatar: any = localStorage.getItem('avatar');
    let avatar_null: any = avatar.match('null');
    if (avatar_null != 'null') {
      this.avatar_path = localStorage.getItem('avatar');
    } else {
      this.avatar_path = '/assets/img/woman-995164_640.png';
    }
  }

  changeSelected(age: number) {
    this.selectedAge = age;
  }

  async saveProfil() {
    this.dataService.save_profil = true;
    this.dataService.name = this.name;
    this.dataService.avatar = this.avatar_path;
    let checked: any = this.dataService.trueOrFalse(this.isChecked);
    await this.as.saveProfilData(
      this.name,
      this.selected_language,
      checked,
      this.selectedAge
    );
    localStorage.setItem('name', this.name);
    localStorage.setItem('autoplay', checked);
    localStorage.setItem('language', this.selected_language);
    this.dialogRef.close();
    this.translate.use(this.selected_language);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('avatar', file);
      const headers = new HttpHeaders({
        Authorization: 'token ' + localStorage.getItem('authToken'),
      });
      const upload$ = this.http
        .post(environment.apiUrl + '/profile/', formData, {
          reportProgress: true,
          observe: 'events',
          headers,
        })
        .pipe(finalize(() => this.reset()));
      upload$.subscribe(
        (event: any) => {
          if (event.type === HttpEventType.Response) {
            const response = event.body;
            setTimeout(() => {
              localStorage.setItem('avatar', newUrl);
              this.avatar_path = newUrl;
              this.avatar_info = response.message;
            }, 1000);
          }
        },
        (error: any) => {
          this.avatar_info = error.error.message;
          // this.avatar_path = '/assets/img/woman-995164_640.png';
        }
      );
      let newUrl = environment.apiUrl + '/media/avatars/' + file.name;
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

  checkGuest() {
    let name = localStorage.getItem('name');
    if (name == 'Guest') {
      this.guest = true;
    } else {
      this.guest = false;
    }
    console.log(this.guest);
  }
}

@Component({
  selector: 'dialog-konto-account',
  templateUrl: 'dialog/konto-account.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
  ],
  providers: [AuthService],
  styleUrl: './dialog/dialog.style.scss',
})
export class DialogAnimationsKontoDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsKontoDialog>,
    private as: AuthService,
    public translate: TranslateService
  ) {}
  hide2 = true;
  hide = true;
  your_email: string | any = '';
  message_mail: string | any;
  guest: boolean = false;

  message_password: string | any;
  current_password: string = '';
  new_password: any = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  email = new FormControl(this.your_email, [
    Validators.required,
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  ]);

  async ngOnInit() {
    let email: string | any = await this.as.loadEmail();
    this.your_email = email.email;
    let language: any = localStorage.getItem('language');
    this.translate.use(language);
    this.checkGuest();
    this.email = new FormControl(this.your_email, [
      Validators.required,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]);
  }

  async submitFormChangeEmail() {
    this.getErrorMessage();
    if (this.email.status == 'VALID') {
      let messsage: any = await this.as.resetMailAcc(this.email.value);
      this.message_mail = messsage.success;
      this.getErrorMessage();
      setTimeout(() => {
        this.message_mail = '';
      }, 2500);
    }
  }

  async submitFormChangePassword() {
    let message: any;
    try {
      message = await this.as.resetPasswordAcc(
        this.current_password,
        this.new_password.value
      );
      this.message_password = message.success;
      this.current_password = '';
      this.new_password = new FormControl('');
    } catch (e: any) {
      this.message_password = e.error.error;
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.email.hasError('pattern')) {
      return 'Not a valid email';
    }
    return '';
  }

  checkGuest() {
    let name = localStorage.getItem('name');
    if (name == 'Guest') {
      this.guest = true;
    } else {
      this.guest = false;
    }
    console.log(this.guest);
  }
}
