import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from '../../config/url.servicios'

@Injectable()
export class ProductosService {

  pagina: number = 0
  productos: any[] = []

  constructor(public http: Http) {
    this.cargar_todos()
  }

  cargar_todos(){

    let promesa = new Promise( ( resolve, reject) => {
      
      
      let url = URL_SERVICIOS + '/productos/todos/' + this.pagina

      this.http.get(url)
                .map( resp => resp.json())
                .subscribe( data => {
  
                  console.log(data)
  
                  if ( data.error ){
  
                  }else{
                    this.productos.push( ...data.productos )
                    this.pagina += 1
                  }

                  resolve()
  
      })
  
    })
    return promesa
  }

}
