import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleActor } from 'src/app/interfaces/creditos.peliculas';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-detalle-actor',
  templateUrl: './detalle-actor.component.html',
  styleUrls: ['./detalle-actor.component.css']
})
export class DetalleActorComponent implements OnInit {

  public actor?: DetalleActor | null;

  constructor(private peliculasService: PeliculasService,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params.id;
    this.peliculasService.obtenerDetalleActor(id).subscribe( actor => {
      if (!actor) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.actor = actor;
    })
  }

  onClickRegresar(){
    this.location.back();
  }

}
