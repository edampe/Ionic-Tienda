import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AlertController, Platform } from 'ionic-angular';

// Plugin Storage
import { Storage } from '@ionic/storage';


@Injectable()
export class CarritoService {

  items: any[] = []

  constructor(public http: Http,
              private alertCtrl: AlertController,
              private platform:Platform,
              private storage: Storage ) {

                this.cargar_storage()
  }

  agregar_carrito( item_parametro: any ){

    for ( let item of this.items ){
      if( item.codigo == item_parametro.codigo ){

        this.alertCtrl.create({
          title: 'Item ya existe',
          subTitle: item_parametro.producto + ', ya se encuentra en su carrito de compras ',
          buttons: ['OK']
        }).present()
        return
      }
    }

    this.items.push( item_parametro )
    this.guardar_storage()

  }

  private guardar_storage(){

    if ( this.platform.is('cordova')){
      // Dispositivo

      this.storage.set('items', this.items)

    }else{
      // Computador
      localStorage.setItem('items', JSON.stringify(this.items))
    }

  }

  cargar_storage(){

    let promesa =  new Promise( (resolve, reject ) => {
      if ( this.platform.is('cordova')){
          // Dispositivo

          this.storage.ready()
                      .then( () => {
                        this.storage.get('items')
                                      .then( items => {
                                          if ( items ) {
                                            this.items = items
                                          }
                                          resolve()

                                      })
                      })

      }else{
          // Computador
          if ( localStorage.getItem('items') ) {
            this.items = JSON.parse(localStorage.getItem('items'))
          }
          resolve()
      }

    })

    return promesa
  }

}
