import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarRestaurantePage } from './agregar-restaurante';

@NgModule({
  declarations: [
    AgregarRestaurantePage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarRestaurantePage),
  ],
})
export class AgregarRestaurantePageModule {}
