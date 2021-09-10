import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera.response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const posicionScroll = (document.documentElement.scrollTop || document.body.scrollTop) + 800;
    const scrollTotal = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (posicionScroll > scrollTotal) {

      if (this.peliculasService.cargando) {return;}

      this.peliculasService.obtenerPeliculas().subscribe( movies => {
        this.movies.push(...movies);
      }); 
    }
  }

  constructor(private peliculasService: PeliculasService) { }
  
  ngOnDestroy(): void {
    this.peliculasService.resetNumeroPagina();
  }

  ngOnInit(): void {
      this.peliculasService.obtenerPeliculas().subscribe(movies =>{
        // console.log(resp.results);
        this.movies = movies;
        this.moviesSlideShow = movies;
      });
  }

}
