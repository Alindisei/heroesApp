
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';



@Injectable({ providedIn: 'root' })

export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient) { }

  //endpoint para traer mis datos.
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
    }

    /*esto regresara un Hero o undefined, porque si el usuario manda un id que no existe,
    regresara undefined..*/
   getHeroById( id: string ): Observable<Hero|undefined> {
      return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        catchError( error => of(undefined) ) //si viene un error, el of crea un observable basado en el valor especificado entre (). sino regresaria undefined la funcion.
        );
   }


   getSuggestions( query: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
   }

        // CRUD

   //manda el endpoint al que quiero llagar y
   //como argumento el hero(seria como el body (lo que quiero agregar)
   addHero( hero: Hero ): Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero);
   }

   //subscribir, pero sin destruirlo. actualizar parte del registro se usa mejor un patch
   updateHero( hero: Hero ): Observable<Hero> {
    if ( !hero.id ) throw Error('Hero id is required.')
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero);
   }

   //
   deleteHeroById( id: string ): Observable<boolean> {
    return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
    .pipe(
      map( resp => true ),
      catchError( err => of( false ) ), //si sale un error, dara false, lo que aueire decir que no se borro
    );
   }






}
