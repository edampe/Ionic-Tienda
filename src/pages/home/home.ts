import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductosService } from '../../providers/index.services';

import { ProductoPage } from '../paginas.index';

import { CarritoService } from '../../providers/index.services';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productoPage = ProductoPage

  constructor(public navCtrl: NavController,
              private _ps: ProductosService,
              private _cs: CarritoService) {

  }

  siguiente_pagina(infiniteScroll){

    this._ps.cargar_todos()
            .then( () => {

              infiniteScroll.complete()

    })

  }

}
