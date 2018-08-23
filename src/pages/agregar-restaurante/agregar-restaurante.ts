import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NgForm } from '@angular/forms';
import { RestaurantesProvider } from '../../providers/restaurantes/restaurantes';
import { File, Entry } from '@ionic-native/file';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-agregar-restaurante',
  templateUrl: 'agregar-restaurante.html',
})
export class AgregarRestaurantePage {

  ubicacion = {
    lat: 0,
    lng: 0
  };

  ubicacionLista = false;
  imagenes: string[] = [];

  options: CameraOptions = {
    correctOrientation: true
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              public toastCtrl: ToastController,
              private camera: Camera,
              public _rp: RestaurantesProvider,
              public viewCtrl: ViewController,
              private file: File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarRestaurantePage');
  }

  localizar(){
    this.geolocation.getCurrentPosition({timeout: 6000})
        .then(ubicacion => {
          this.ubicacion.lat = ubicacion.coords.latitude;
          this.ubicacion.lng = ubicacion.coords.longitude;
          this.ubicacionLista = true;
        })
        .catch(error => {
          let toast = this.toastCtrl.create({
            message: 'No se pudo encontrar la ubicación',
            duration: 2000
          });

          toast.present();
        })
  }

  tomarFoto(){
    this.camera.getPicture(this.options)
        .then(imagenInfo => {
          //this.imagenes.push(imagenInfo);
          let path = imagenInfo.substr(0, imagenInfo.lastIndexOf('/') + 1);
          let nombre = imagenInfo.substr(imagenInfo.lastIndexOf('/') + 1);
          let nuevoNombre = new Date().getMilliseconds() + '.jpg';
          this.file.moveFile(path, nombre, cordova.file.dataDirectory, nuevoNombre)
                   .then((info:Entry) => {
                     this.imagenes.push(info.nativeURL);
                     this.camera.cleanup();
                   })
                   .catch(error => {
                     let toast = this.toastCtrl.create({
                       message: 'Ocurrio un error. File.moveFile',
                       duration: 3000
                     });

                     toast.present();
                     this.camera.cleanup();
                   });
        })
        .catch(error => {
          let toast = this.toastCtrl.create({
            message: 'No se pudo usar la camara',
            duration: 3000
          });

          toast.present();
          this.camera.cleanup();
        })
  }

  agregarRestaurante(formulario: NgForm){
    this._rp.agregarRestaurante(formulario.value.nombre,
                                this.imagenes,
                                formulario.value.rating,
                                this.ubicacion);
    formulario.reset();
    this.ubicacion = null;
    this.imagenes = [];
    this.viewCtrl.dismiss();
  }

}
