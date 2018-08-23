import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AutenticacionProvider {

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AutenticacionProvider Provider');
  }

  registrarUsuario(correo: string, clave: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(correo, clave);
  }

  iniciarSesion(correo: string, clave: string){
    return this.afAuth.auth.signInWithEmailAndPassword(correo, clave);
  }

  terminarSesion(){
    this.afAuth.auth.signOut();
  }
}
