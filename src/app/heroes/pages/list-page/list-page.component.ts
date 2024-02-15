import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})

//cualquier peticion http cuando se monta se implementa el NgOnInit
export class ListPageComponent implements OnInit{

  public heroes: Hero[] = [];

  constructor( private heroesService: HeroesService ) {}

  //para que se dispare hay que subscribirse, aqui se ha traido la data.
  ngOnInit(): void {
    this.heroesService.getHeroes()
    .subscribe( heroes => this.heroes = heroes );
  }

}
