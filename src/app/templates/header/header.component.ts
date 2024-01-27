import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
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
  HttpResponse,
} from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { Subscription, finalize } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
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
    private dataService: DataService
  ) {}

  ngOnInit() {
    let path: any = localStorage.getItem('avatar');
    if (path.length >= 5) {
      this.avatar_path = localStorage.getItem('avatar');
    } else {
      this.avatar_path = '/assets/img/logo/logo.png';
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
      width: '250px',
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
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
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
  ],
  providers: [AuthService],
})
export class DialogAnimationsDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsDeleteDialog>,
    private as: AuthService,
    private router: Router
  ) {}

  async deleteAccount() {
    let token: string | any = localStorage.getItem('authToken');
    await this.as.deleteUser(token);
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
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
    _MatSlideToggleRequiredValidatorModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  providers: [AuthService],
  styleUrl: './dialog/dialog.style.scss',
})
export class DialogAnimationsProfilDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsProfilDialog>,
    private as: AuthService,
    private http: HttpClient,
    private dataService: DataService
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

  async ngOnInit() {
    let data: string | any = await this.as.loadProfilData();
    this.name = data.name;
    this.selected_language = data.language;
    this.isChecked = data.automatic_playback;
    this.selectedAge = data.age_rating;
    localStorage.setItem('name', data.name);
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
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('avatar', file);
      const upload$ = this.http
        .post(environment.apiUrl + '/profile/', formData, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(finalize(() => this.reset()));
      upload$.subscribe(
        (event: any) => {
          if (event.type === HttpEventType.Response) {
            const response = event.body;
            setTimeout(() => {
              this.avatar_path = newUrl;
              this.avatar_info = response.message;
            }, 1500);
          }
        },
        (error: any) => {
          this.avatar_info = error.error.message;
          this.avatar_path = '/assets/img/woman-995164_640.png';
        }
      );
      let newUrl = environment.apiUrl + '/media/avatars/' + file.name;

      localStorage.setItem('avatar', newUrl);
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
  ],
  providers: [AuthService],
  styleUrl: './dialog/dialog.style.scss',
})
export class DialogAnimationsKontoDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsKontoDialog>,
    private as: AuthService
  ) {}

  hide = true;
  your_email: string | any = '';
  message_mail: string | any;

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
    this.email = new FormControl(this.your_email, [
      Validators.required,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]);
  }

  async submitFormChangeEmail() {
    this.getErrorMessage();
    console.log(this.email);
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
}
