import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';




@Injectable({providedIn: 'root'})
export class AuthService {
  //al hacerlo privado solo se prodra modificar a traves de este servicio.
  private baseUrl = environments.baseUrl;
  private user?: User;


  constructor(private http: HttpClient) { }


  get currentUser(): User|undefined {
    if( !this.user ) return undefined;
    return structuredClone(this.user);
  }


    //establece el usuario y lo guarda en el localStorage
  login( email: string, password: string ): Observable<User> {

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
    .pipe(
      tap( user => this.user = user),//establece el user
      tap( user => localStorage.setItem('token','hjashshsdfjdhfsh' )), //guarda aqui el user
      );

  }


  logout() {
    this.user = undefined;
    localStorage.clear();
  }


}
