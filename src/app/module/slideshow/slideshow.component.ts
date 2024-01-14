import { Component, OnInit } from '@angular/core';
import { CarouselModule } from '@coreui/angular';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [CarouselModule, RouterModule, CommonModule],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss',
})
export class SlideshowComponent implements OnInit {
  slides: any[] = new Array(3).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
    url: '',
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: './assets/img/1.png',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      url: '',
    };
    this.slides[1] = {
      id: 1,
      src: './assets/img/new_movie.jpg',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: '/' + 'register',
    };
    this.slides[2] = {
      id: 2,
      src: './assets/img/2.png',
      title: 'Third slide',
      subtitle:
        'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
      url: '/' + 'home',
    };
  }

  openMovie(url: any) {
    console.log(url);
    // this.router.navigate([]);
  }
}
