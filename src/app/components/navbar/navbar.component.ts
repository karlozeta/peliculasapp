import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private peliculasService: PeliculasService) { }

  ngOnInit(): void {
  }

  buscarPelicula(buscar: string){
    if(buscar.trim().length === 0){return;}
    
    this.router.navigateByUrl(`/buscar/${buscar}`)

  }

}
