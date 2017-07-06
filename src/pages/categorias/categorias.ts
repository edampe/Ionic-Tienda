import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProductosService } from '../../providers/index.services';

import { PorCategoriasPage } from '../paginas.index';


@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  porCategoriasPage = PorCategoriasPage

  constructor( public navCtrl: NavController, 
               public navParams: NavParams,
               private _ps: ProductosService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
  }

}
