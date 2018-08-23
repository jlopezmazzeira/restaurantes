import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Restaurante } from '../../model/restaurante';
import { SocialSharing } from '@ionic-native/social-sharing';
import { RestaurantesProvider } from '../../providers/restaurantes/restaurantes';

@IonicPage()
@Component({
  selector: 'page-restaurante',
  templateUrl: 'restaurante.html',
})
export class RestaurantePage {

  restaurante: Restaurante;
  rid: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public social: SocialSharing,
              public _rp: RestaurantesProvider) {
    this.restaurante = navParams.get("restaurante");
    this.rid = navParams.get("rid");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantePage');
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

  compartir(){
    let mensaje = this.restaurante.nombre;
    let url = "https://wwww.google.com/maps/@"
              + this.restaurante.ubicacion.lat + ","
              + this.restaurante.ubicacion.lng + ",9z?hl=es";

    this.social.shareViaWhatsApp(mensaje,
      this.restaurante.imagenes[0], url);
  }

  borrar(){
    this._rp.borrarRestaurante(this.rid);
    this.cerrar();
  }

}
