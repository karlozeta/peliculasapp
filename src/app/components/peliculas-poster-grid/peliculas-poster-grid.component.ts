import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera.response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies?: Movie[];

  constructor(private router: Router, 
              private peliculaService: PeliculasService) { }

  ngOnInit(): void {
    console.log(this.movies);
  }

  onMovieClick(movie: Movie){
    this.router.navigate(['/pelicula', movie.id]);
    this.peliculaService.obtenerDetallePelicula(movie.id)
  }
}
