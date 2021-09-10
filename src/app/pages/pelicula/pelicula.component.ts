import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/creditos.peliculas';
import { PeliculasDetalle } from 'src/app/interfaces/peliculas.detalle';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent implements OnInit {

  public pelicula?: PeliculasDetalle;
  public creditos: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private peliculasService: PeliculasService,
              private location: Location) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    combineLatest([
      this.peliculasService.obtenerDetallePelicula(id),
      this.peliculasService.obtenerCreditosPelicula(id)
    ]).subscribe( ([movie, creditos]) => {
      //Validar detalles de peliculas
      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = movie;

      //Validar creditos
      if (!creditos) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.creditos = creditos;
    });

    // this.peliculasService.obtenerDetallePelicula(id).subscribe( movie =>{
    //   if (!movie) {
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.pelicula = movie;
    // });
    // this.peliculasService.obtenerCreditosPelicula(id).subscribe(creditos => {
    //   if (!creditos) {
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.creditos = creditos;
    // })
  }

  onClickRegresar(){
    this.location.back();
  }



}
