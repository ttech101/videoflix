import { Component, OnInit } from '@angular/core';
import { CarouselModule } from '@coreui/angular';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [
    CarouselModule,
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss',
})
export class SlideshowComponent implements OnInit {
  constructor(
    private as: AuthService,
    private router: Router,
    private zone: NgZone
  ) {}

  data?: any = [];

  slides: any[] = new Array(3).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
    url: '',
  });
  showIndicator!: number;
  url!: string | any;

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.startSlides();
    this.data = await this.as.loadPreview('newHeader');
    this.updateSlides();
  }

  updateSlides() {
    this.zone.run(() => {
      this.slides[0] = {
        id: 0,
        src: this.data[0].big_picture,
        title: this.data[0].movie_name,
        subtitle: this.data[0].description_short,
        url: '/single-view/',
      };
      this.slides[1] = {
        id: 1,
        src: this.data[1].big_picture,
        title: this.data[1].movie_name,
        subtitle: this.data[1].description_short,
        url: '/single-view/?select=' + this.data[1].random_key,
      };
      this.slides[2] = {
        id: 2,
        src: this.data[2].big_picture,
        title: this.data[2].movie_name,
        subtitle: this.data[2].description_short,
        url: '/single-view/?select=' + this.data[2].random_key,
      };
    });
  }

  startSlides() {
    this.slides[0] = {
      id: 0,
      src: '',
      title: '',
      subtitle: '',
      url: '',
    };
    this.slides[1] = {
      id: 1,
      src: '',
      title: '',
      subtitle: '',
      url: '',
    };
    this.slides[2] = {
      id: 2,
      src: '',
      title: '',
      subtitle: '',
      url: '',
    };
  }

  openMovie() {
    this.url = this.slides[this.showIndicator].url;
    this.router.navigate(['/single-view'], {
      queryParams: { select: this.data[this.showIndicator].random_key },
    });
  }

  onItemChange(event: any) {
    this.showIndicator = event;
    return this.showIndicator;
  }
  trackByFunction0(index: any, item: any) {
    return item[0];
  }

  trackByFunction1(index: any, item: any) {
    return item[1];
  }

  trackByFunction2(index: any, item: any) {
    return item[2];
  }
}
