import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { CarritoService, 
         ProductosService, 
         UsuarioService } from '../providers/index.services';

import { ImagenPipe } from '../pipes/imagen/imagen';

import { CarritoPage,
         CategoriasPage,
         HomePage,
         LoginPage,
         OrdenesDetallePage,
         OrdenesPage,
         PorCategoriasPage,
         ProductoPage,
         TabsPage,
         BuscarPage } from '../pages/paginas.index';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    CarritoPage,
    CategoriasPage,
    HomePage,
    LoginPage,
    OrdenesDetallePage,
    OrdenesPage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage,
    ImagenPipe,
    BuscarPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CarritoPage,
    CategoriasPage,
    HomePage,
    LoginPage,
    OrdenesDetallePage,
    OrdenesPage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage,
    BuscarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoService,
    ProductosService,
    UsuarioService
  ]
})
export class AppModule {}
