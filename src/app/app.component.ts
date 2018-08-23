import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { IniciarsesionPage } from '../pages/iniciarsesion/iniciarsesion';

import { AngularFireAuth } from 'angularfire2/auth';
import { AutenticacionProvider } from '../providers/autenticacion/autenticacion';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = HomePage;
  homePage = HomePage;
  iniciarSesion = IniciarsesionPage;
  @ViewChild('contenido') contenido:NavController;
  usuarioConectado = false;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menuCtrl: MenuController,
              private afAuth: AngularFireAuth,
              private _pa: AutenticacionProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.afAuth.auth.onAuthStateChanged(
      usuario => {
        if (usuario != null) {
            this.usuarioConectado = true;
            this.contenido.setRoot(this.homePage);
        } else {
          this.usuarioConectado = false;
          this.contenido.setRoot(this.iniciarSesion);
        }
      }
    );
  }

  llamarPagina(pagina){
    this.contenido.setRoot(pagina);
    this.menuCtrl.close();
  }

  terminarSesion(){
    this._pa.terminarSesion();
    this.menuCtrl.close();
  }

}
