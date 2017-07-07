import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProductosService } from '../../providers/index.services';

import { ProductoPage } from '../paginas.index'


@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})

export class BuscarPage {

  productoPage = ProductoPage

  productos: any[] = []

  termino: string = ""

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _ps: ProductosService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarPage');
  }

  buscar_producto(ev: any){

    let val = ev.target.value;

    this._ps.buscar(val)
              .subscribe( data => {

                if (data.error){
                  // Manejo de errores
                }else{
                  this.productos = data.productos
                }
              })

  }



}
