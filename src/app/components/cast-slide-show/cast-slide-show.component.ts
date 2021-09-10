import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cast, DetalleActor } from 'src/app/interfaces/creditos.peliculas';
import { PeliculasService } from 'src/app/services/peliculas.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slide-show',
  templateUrl: './cast-slide-show.component.html',
  styleUrls: ['./cast-slide-show.component.css']
})
export class CastSlideShowComponent implements OnInit, AfterViewInit {

  @Input() cast?: Cast[] = [];

  constructor(private router: Router,
              private peliculasService: PeliculasService) { }
  ngAfterViewInit(): void {
    const swiper = new Swiper(
      '.swiper',
      {
        slidesPerView: 5.3,
        freeMode: true,
        spaceBetween: 15
      }
    );
  }

  ngOnInit(): void {
    console.log(this.cast);
  }

  onClickActor(actor: Cast){
    this.router.navigateByUrl(`/actor/${actor.id}`);
  }

}
