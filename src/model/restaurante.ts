export class Restaurante {
    constructor(public nombre: string,
                public imagenes: string[],
                public rating: string,
                public ubicacion: {lat: number, lng: number}){

    }
}
