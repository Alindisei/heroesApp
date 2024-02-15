import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})


export class HeroImagePipe implements PipeTransform {
  //la idea de este pipe es que reciba un heroe y devuelva un url.
  transform( hero: Hero ): string {
    //hace un consulta:
    if ( !hero.id && !hero.alt_img ) {
      return 'assets/no-image.png';
    }

    if ( hero.alt_img ) return hero.alt_img;

    //esto es lo que voy a mostrar si existe el heroe.
    return `assets/heroes/${ hero.id }.jpg`;
  }

}
