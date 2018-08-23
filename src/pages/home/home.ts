import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AgregarRestaurantePage } from '../agregar-restaurante/agregar-restaurante';
import { Restaurante } from '../../model/restaurante';
import { RestaurantesProvider } from '../../providers/restaurantes/restaurantes';
import { RestaurantePage } from '../restaurante/restaurante';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  agregarRestaurantePage = AgregarRestaurantePage;
  restaurantes: Restaurante[] = [];

  constructor(public navCtrl: NavController,
              public _rp: RestaurantesProvider,
              public modalCtrl: ModalController) {

  }

  ngOnInit(){
    this._rp.inicializarRestaurantes()
            .then((restaurantes: Restaurante[]) => {
              this.restaurantes = restaurantes;
            }).catch(error => { console.log(error)});
  }

  ionViewWillEnter(){
    this.restaurantes = this._rp.cargarRestaurantes();
  }

  mostrarRestaurante(restaurante: Restaurante, rid: number){
    let modal = this.modalCtrl.create(RestaurantePage,
      {restaurante: restaurante, rid: rid});

    modal.present();
    modal.onDidDismiss(()=>{
      this.restaurantes = this._rp.cargarRestaurantes();
    });
  }

}
