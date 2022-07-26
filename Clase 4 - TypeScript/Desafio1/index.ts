import {Personaje} from './personaje';
import {Spiderman} from './spiderman';


let nombre : string = "Miguelo";
let edad : number = 30;
const PERSONAJE : Personaje = new Personaje (nombre, edad);
let PERSONAJE2 : Spiderman = {
    nombre: "Peter Parker",
    poderes: ["Lanzar tela","Trepar muros"]
}


console.log(PERSONAJE2);
