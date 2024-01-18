import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { ThemePalette } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private dataService: DataService
  ) {}
  name: string | any = this.dataService.getUser();

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
    this.dialog.open(DialogAnimationsProfilDialog, {
      enterAnimationDuration,
      exitAnimationDuration,
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
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog/delete-account.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class DialogAnimationsDeleteDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsDeleteDialog>) {}
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog/profil-account.html',
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
    MatChipsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDividerModule,
  ],
  styleUrl: './dialog/dialog.style.scss',
})
export class DialogAnimationsProfilDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsProfilDialog>) {}
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  myControl = new FormControl('Deutsch');
  options: string[] = ['Deutsch', 'Englisch'];
}

@Component({
  selector: 'dialog-animations-example-dialog',
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
  ],
  styleUrl: './dialog/dialog.style.scss',
})
export class DialogAnimationsKontoDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsKontoDialog>) {}
  hide = true;
  your_email = 'yourMail@example.com';
  email = new FormControl(this.your_email, [
    Validators.required,
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  ]);
  submitForm() {
    if (this.email.status == 'VALID') {
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    // Überprüfe, ob die E-Mail-Adresse gültig ist
    if (this.email.hasError('pattern')) {
      return 'Not a valid email';
    }
    return '';
  }
}
