import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarteleraResponse, Movie, OriginalLanguage } from '../interfaces/cartelera.response';
import { Cast, CreditosPeliculas, DetalleActor } from '../interfaces/creditos.peliculas';
import { PeliculasDetalle } from '../interfaces/peliculas.detalle';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  // private url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=87affbbba5028a7456be3e9d68bcff23&language=es-ES&page=1';
  private url = 'https://api.themoviedb.org/3';
  private paginas = 1;
  private totalPages = 1;
  public cargando: boolean = false;
  public ultimaPagina: boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  get parametros(){
    return {
      api_key: '87affbbba5028a7456be3e9d68bcff23',
      language: OriginalLanguage.Es,
      page: this.paginas
    }
  }

  obtenerPeliculas(): Observable<Movie[]>{

    if (this.cargando){
      //of() sirve para retornar un Observable
      return of([]);
    }
  
    this.cargando = true;
    console.log('Cargando API');
    return this.httpClient.get<CarteleraResponse>(`${this.url}/movie/now_playing?`, {
      params: this.parametros
    }).pipe(
      map( (resp) => resp.results),
      tap( () => {
        //Aumentar numero de paginas
        this.paginas += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas(descripcion: string): Observable<Movie[]>{

    const params = {...this.parametros, query: descripcion};

    if (this.ultimaPagina){
      //of() sirve para retornar un Observable
      return of([]);
    }
    this.ultimaPagina = false;
    return this.httpClient.get<CarteleraResponse>(`${this.url}/search/movie`, {
      params: params
    }).pipe(
      map( resp => {
        this.totalPages = resp.total_pages;
        console.log(this.totalPages);
        return resp.results;  
      }),
      tap( () => {
        if (this.paginas >= this.totalPages){
          this.ultimaPagina = true;
        } else {
          this.paginas += 1;
        }
        console.log({
          pages: this.paginas,
          totalPage: this.totalPages,
          ultPagina: this.ultimaPagina

        });
      }
      )
    )
  }

  obtenerDetallePelicula(idMovie: number){
    return this.httpClient.get<PeliculasDetalle>(`${this.url}/movie/${idMovie}`, {params: this.parametros})
      .pipe(
        catchError(error => of(null))
      );
  }

  obtenerCreditosPelicula(idMovie: number): Observable<Cast[]>{
    return this.httpClient.get<CreditosPeliculas>(`${this.url}/movie/${idMovie}/credits`, {params: this.parametros})
      .pipe(
        map( casting => {
          return casting.cast;
        }),
        catchError(error => of([]))
      );
  }

  obtenerDetalleActor(idActor: number){
    return this.httpClient.get<DetalleActor>(`${this.url}/person/${idActor}`, {params: this.parametros})
      .pipe(
        catchError(error => of(null))
      );
  }

  resetNumeroPagina(){
    this.paginas = 1;
  }
}
