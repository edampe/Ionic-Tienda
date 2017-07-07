import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from '../../config/url.servicios'


@Injectable()
export class ProductosService {

  pagina: number = 0
  productos: any[] = []
  lineas: any[] = []
  porCategoria: any[] = []

  constructor(public http: Http) {
    this.cargar_todos()
    this.cargar_lineas()
  }

  cargar_por_categoria( categoria: number){

    let url = URL_SERVICIOS + '/productos/por_tipo/' + categoria

    this.http.get(url)
              .map( resp => resp.json())
              .subscribe( data => {

                console.log(data)

                if ( data.error ){

                }else{
                  this.porCategoria = data.productos
                  console.log(this.porCategoria)
                }


    })
  }

  

  cargar_lineas(){

    let url = URL_SERVICIOS + '/lineas/'

      this.http.get(url)
                .map( resp => resp.json())
                .subscribe( data => {
  
                  console.log(data)
  
                  if ( data.error ){
  
                  }else{
                    this.lineas = data.lineas
                    console.log(this.lineas)
                  }
      })

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

  buscar( termino: string){

    let url =  `${ URL_SERVICIOS }/productos/buscar/${ termino }`

    return this.http.get( url )
                    .map( resp => resp.json())
    

  }

}
