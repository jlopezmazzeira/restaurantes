import { Injectable } from '@angular/core';
import { Restaurante } from '../../model/restaurante';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';

declare var cordova: any;

@Injectable()
export class RestaurantesProvider {

  restaurantes: Restaurante[] = [];

  constructor(private storage: Storage,
              public file: File,
              public toastCtrl: ToastController) {
    console.log('Hello RestaurantesProvider Provider');
  }

  agregarRestaurante(nombre: string, imagenes: string[],
                    rating: string, ubicacion: {lat: number, lng: number}){

    let restaurante = new Restaurante(nombre, imagenes, rating, ubicacion);

    this.restaurantes.push(restaurante);

    this.storage.set('restaurantes', this.restaurantes);
  }

  cargarRestaurantes(){
    return this.restaurantes.slice(); //Realiza una copia del objeto
  }

  inicializarRestaurantes(){
    return this.storage.get('restaurantes').then(
      (restaurantes:Restaurante[]) => {
        if (restaurantes == null) {
            this.restaurantes = [];
        } else {
          this.restaurantes = restaurantes;
        }
        return this.restaurantes.slice();
      }).catch(error => {
        console.log(error);
      })
  }

  borrarRestaurante(rid:number){
    let restaurante = this.restaurantes[rid];
    this.restaurantes.splice(rid, 1);
    this.storage.set('restaurantes', this.restaurantes)
                .then(() =>{
                  this.borrarImagenes(restaurante);
                })
                .catch();
  }

  borrarImagenes(restaurante: Restaurante){
    restaurante.imagenes.forEach((imagen) => {
      let nombre = imagen.substr(imagen.lastIndexOf('/') + 1);
      this.file.removeFile(cordova.file.dataDirectory, nombre)
               .then()
               .catch(error => {
                 let toast = this.toastCtrl.create({
                   message: 'Ocurrio un error al eliminar las imagenes',
                   duration: 3000
                 });
                 this.agregarRestaurante(restaurante.nombre, restaurante.imagenes,
                 restaurante.rating, restaurante.ubicacion);
                 toast.present();
               });

    });

  }

}
