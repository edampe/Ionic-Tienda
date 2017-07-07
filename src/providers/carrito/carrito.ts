import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { AlertController, Platform, ModalController } from 'ionic-angular';

// Plugin Storage
import { Storage } from '@ionic/storage';

// Usuario Service.
import { UsuarioService } from '../usuario/usuario';

// Paginas
import { LoginPage, CarritoPage } from '../../pages/paginas.index';

import { URL_SERVICIOS } from '../../config/url.servicios';



@Injectable()
export class CarritoService {

  items: any[] = []
  total_carrito: number = 0
  ordenes: any[] = []

  constructor(public http: Http,
              private alertCtrl: AlertController,
              private platform:Platform,
              private storage: Storage,
              private _us: UsuarioService,
              private modalCtrl: ModalController ) {

                this.cargar_storage()
                this.actualizar_total()
  }

  remover_item( idx: number ){

    this.items.splice(idx,1)
    this.guardar_storage()

  }

  realizar_pedido(){

    let data = new URLSearchParams

    let codigos: string[] = []

    for ( let item of this.items ){
      codigos.push(item.codigo)
    }

    data.append('items', codigos.join(','))

    let url =  `${ URL_SERVICIOS }/pedidos/realizar_orden/${ this._us.token }/${ this._us.id_usuario}`

    console.log(url)

    this.http.post( url, data )
              .subscribe( resp => {
                let respuesta = resp.json()

                if(respuesta.error){
                  // Mostrar Error
                  this.alertCtrl.create({
                    title: 'Error orden!',
                    subTitle: respuesta.mensaje,
                    buttons: ['Ok']
                  }).present()
                }else{
                  this.items = []
                  this.alertCtrl.create({
                    title: 'Orden realizada!',
                    subTitle: 'Nos contactaremos con usted proximamente',
                    buttons: ['Ok']
                  }).present()
                }
              })

    


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
    this.actualizar_total()
    this.guardar_storage()
  }

  actualizar_total(){

    this.total_carrito = 0 

    for(let item of this.items){
      this.total_carrito += Number(item.precio_compra)
    }
  }


  ver_carrito(){

    let modal: any

    if ( this._us.token ){
      // Mostrar el carrito
      modal = this.modalCtrl.create( CarritoPage )
      
    }else{
      // Mostrar el Login
      modal = this.modalCtrl.create( LoginPage )
    }

    modal.present()

    modal.onDidDismiss( (abrirCarrito: boolean) => {
        if (abrirCarrito){
          this.modalCtrl.create( CarritoPage ).present()
        }
      })

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

  cargar_ordenes(){

    let url =  `${ URL_SERVICIOS }/pedidos/obtener_pedidos/${ this._us.token }/${ this._us.id_usuario}`

    this.http.get(url)
              .map( resp => resp.json())
              .subscribe( data => {

                if( data.error ){
                  // Manejar Error
                }else{

                  this.ordenes = data.ordenes



                }
              })
  }

  borrar_orden( orden_id: string ){

    let url =  `${ URL_SERVICIOS }/pedidos/borrar_pedido/${ this._us.token }/${ this._us.id_usuario}/${ orden_id }`

    return this.http.delete( url )
                      .map( resp => resp.json() )
  }




}
