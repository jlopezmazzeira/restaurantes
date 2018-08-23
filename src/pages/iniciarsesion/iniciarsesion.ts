import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AutenticacionProvider } from '../../providers/autenticacion/autenticacion';

@IonicPage()
@Component({
  selector: 'page-iniciarsesion',
  templateUrl: 'iniciarsesion.html',
})
export class IniciarsesionPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _pa: AutenticacionProvider,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IniciarsesionPage');
  }

  iniciarSesion(formulario: NgForm){
    this._pa.iniciarSesion(
      formulario.value.correo,
      formulario.value.clave,
    )
    .then(info => console.log(info))
    .catch(error =>{
      let alert = this.alertCtrl.create({
          title: 'Ha ocurrido un error',
          message: 'Ocurrio un error al iniciar sesión ' + error,
          buttons: ['OK']
        });

        alert.present();
    });
  }

  registrarUsuario(formulario: NgForm){
    this._pa.registrarUsuario(
      formulario.value.correo,
      formulario.value.clave,
    )
    .then(info => console.log(info))
    .catch(error =>{
      let alert = this.alertCtrl.create({
          title: 'Ha ocurrido un error',
          message: 'Ocurrio un error al registrar el usuario ' + error,
          buttons: ['OK']
        });

        alert.present();
    });
  }

}
