import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera.response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit, OnDestroy {

  public descrip: string = '';

  public movies: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const posicionScroll = (document.documentElement.scrollTop || document.body.scrollTop) + 800;
    const scrollTotal = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (posicionScroll > scrollTotal) {

      if (this.peliculasService.cargando) {return;}

      if (this.peliculasService.ultimaPagina){return;}

      this.peliculasService.buscarPeliculas(this.descrip).subscribe( movies => {
        this.movies.push(...movies);
      }); 
    }
  }

  constructor(private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService) { }

  ngOnDestroy(): void {
    this.peliculasService.resetNumeroPagina();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
      console.log(params.descripcion);
      this.descrip = params.descripcion;
      this.peliculasService.buscarPeliculas(params.descripcion)
        .subscribe( movie => {
          console.log(movie),
          this.movies = movie;
        });
    });
  }

}
