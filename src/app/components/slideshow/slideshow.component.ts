import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera.response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'
  ]
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies?: Movie[];

  swiper?: Swiper;

  constructor(private router: Router,
              private peliculasService: PeliculasService) { }
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      loop: true
    });
  }

  ngOnInit(): void {
    // console.log(this.movies);
  }

  onClickPrev(){
    this.swiper?.slidePrev();
  }
  onClickNext(){
    this.swiper?.slideNext();
  }

  onClick(movie: Movie){
    this.router.navigate(['/pelicula', movie.id]);
    this.peliculasService.obtenerDetallePelicula(movie.id)
  }

}
