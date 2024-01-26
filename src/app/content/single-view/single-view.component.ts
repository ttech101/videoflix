import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from '../../templates/header/header.component';
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
import { NewMoviesComponent } from '../../landing/new-movies/new-movies.component';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from '../../module/video-player/video-player.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CategoryNewMoviesComponent } from '../../module/category/category-new-movies/category-new-movies.component';

@Component({
  selector: 'app-single-view',
  standalone: true,
  templateUrl: './single-view.component.html',
  styleUrl: './single-view.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    NewMoviesComponent,
    CommonModule,
    VideoPlayerComponent,
    MatBadgeModule,
    CategoryNewMoviesComponent,
  ],
})
export class SingleViewComponent implements OnInit {
  data: any = [];
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
  video_url: string = '';

  constructor(
    public dialog: MatDialog,
    private as: AuthService,
    private zone: NgZone
  ) {}

  @ViewChild('media') media: ElementRef | any;
  videoplayer!: ElementRef;
  isPlay: boolean = false;

  async ngOnInit() {
    let paramsUrl = new URLSearchParams(document.location.search);
    let key: string | any = paramsUrl.get('select');
    let datas: any = await this.as.loadMovies(key);
    this.data = datas[0];
    this.media.nativeElement.src = this.data.video;
  }

  openDialogDescription() {
    const dialogRef = this.dialog.open(DialogElementsDescriptionDialog, {
      data: {
        descriptionLong: this.data.description,
        author: this.data.author,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Dialog geschlossen', result);
    });
  }

  toggleVideo() {
    const video: any = document.getElementById('video');
    video.classList.remove('dn');
    this.media.nativeElement.play();
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  }

  onCanPlay(event: Event) {
    // Hier können Sie das Video abspielen, wenn es geladen ist
    this.media.nativeElement.pause();
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
    @Inject(MAT_DIALOG_DATA)
    public data: { descriptionLong: string; author: string }
  ) {}
}
