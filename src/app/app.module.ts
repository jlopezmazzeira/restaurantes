import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RestaurantePage } from '../pages/restaurante/restaurante';
import { AgregarRestaurantePage } from '../pages/agregar-restaurante/agregar-restaurante';

//Google Map
import { AgmCoreModule } from '@agm/core';
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';
// Plugins
import { Geolocation } from '@ionic-native/geolocation';
// Camera
import { Camera } from '@ionic-native/camera';
//compartir
import { SocialSharing } from '@ionic-native/social-sharing';
//storage
import { IonicStorageModule } from '@ionic/storage';

//Manager File
import { File } from '@ionic-native/file';

import { RestaurantesProvider } from '../providers/restaurantes/restaurantes';
import { AutenticacionProvider } from '../providers/autenticacion/autenticacion';
import { IniciarsesionPage } from '../pages/iniciarsesion/iniciarsesion';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyA0Xj1vJYHoxBvUFHnbVDXcNstrVdv3pv4",
  authDomain: "restaurantes-9888e.firebaseapp.com",
  databaseURL: "https://restaurantes-9888e.firebaseio.com",
  projectId: "restaurantes-9888e",
  storageBucket: "restaurantes-9888e.appspot.com",
  messagingSenderId: "719094393920"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RestaurantePage,
    AgregarRestaurantePage,
    IniciarsesionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAk-rD3_J8AaYd__2FcTLi_bf5CBhxxPTQ'
    }),
    Ionic2RatingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RestaurantePage,
    AgregarRestaurantePage,
    IniciarsesionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Camera,
    SocialSharing,
    File,
    RestaurantesProvider,
    AutenticacionProvider
  ]
})
export class AppModule {}
