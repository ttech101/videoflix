import { Component, Inject } from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
import { CategoryForYouComponent } from '../../module/category/category-for-you/category-for-you.component';
import { FooterComponent } from '../../templates/footer/footer.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-single-view',
  standalone: true,
  templateUrl: './single-view.component.html',
  styleUrl: './single-view.component.scss',
  imports: [
    HeaderComponent,
    CategoryForYouComponent,
    FooterComponent,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class SingleViewComponent {
  title: string = 'Vaiana';
  description: string =
    'Vaiana, ein abenteuerlustiges Mädchen, bricht auf zu einer mutigen Mission, um ihr Volk zu retten. Unterwegs begegnet sie dem einst mächtigen Halbgott Maui. Gemeinsam überqueren sie das Meer auf einer Reise voller Spaß und Action.';
  description_long: string =
    'Vor 3.000 Jahren überquerten die größten Seefahrer der Welt den Pazifik und entdeckten die Inseln Ozeaniens. Doch dann hörten die Entdeckungsreisen für ein Millenium auf – und niemand weiß warum. Von Walt Disney Animation Studios kommt Vaiana, ein episches Abenteuer über ein mutiges Mädchen, das lossegelt zu einer kühnen Mission, um sein Volk zu retten. Auf ihrer Reise trifft Vaiana auf den einst mächtigen Halbgott Maui. Gemeinsam überqueren sie das Meer auf einer Reise voller Spaß und Action, auf der sie gigantische Meerestiere und atemberaubende Unterwelten sehen und in aussichtslose Situationen geraten. Nebenbei entdeckt Vaiana das, wonach sie immer gesucht hat: Ihre eigene Identität. Einige Sequenzen enthalten Blitzlicht-Effekte, die sich auf lichtempfindliche Zuschauer auswirken können.';
  author: string = 'Tony Tech';
  date: string = '25.11.2012';
  film_length: string = '17:55' + ' min.';
  movie: boolean = false;
  serie: boolean = false;
  genre = 'Sonstiges';
  background_image: string = '/assets/img/test_poster/background-movie.jpeg';
  thumbnail_image: string = '/assets/img/test_poster/badging.jpeg';
  age_rating: number = 0;

  constructor(public dialog: MatDialog) {}

  openDialogDescription() {
    const dialogRef = this.dialog.open(DialogElementsDescriptionDialog, {
      data: {
        descriptionLong: this.description_long,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // Optional: Hier kannst du auf das Schließen des Dialogs reagieren
      console.log('Dialog geschlossen', result);
    });
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'description.dialog.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  styleUrl: './single-view.component.scss',
})
export class DialogElementsDescriptionDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { descriptionLong: string }
  ) {}
}
