import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CarritoService } from '../../providers/index.services';


@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  orden: any = {}

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _cs: CarritoService) {

    this.orden = this.navParams.get('orden')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdenesDetallePage');
  }


  borrar_orden(orden_id: string){

    this._cs.borrar_orden( orden_id )
              .subscribe( data => {

                if( data.error ){

                }else{
                  this.navCtrl.pop()
                }

              } )


  }

}
