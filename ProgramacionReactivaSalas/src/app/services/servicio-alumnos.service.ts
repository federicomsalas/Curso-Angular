import { Injectable } from '@angular/core';
import { Observable, Subject, of, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioAlumnosService {
  
  alumnosObservable: Observable<any>;
  contador: number = 0;


  alumnos: any = [];

  nombres: string[] = ['Benjamin','Isabella','Martina','Catalina','Bautista','Sofia','Olivia ','Felipe','Emma','Valentino','Benicio','Joaquín','Delfina','Lorenzo','Francesca','Valentina','Emilia','Mateo','Juan Ignacio','Santino','Tomás','Francisco','Juana','Josefina','Santiago','Simon','Guillermina','Ignacio','Victoria','Guadalupe','Agustin','Thiago Benjamín','Julieta','Pedro','Renata','Alma','Jazmin','Ciro','Juan Cruz','Thiago','Lola','Pilar','Lucia','Lautaro','Bruno','Malena','Julia','Dante','Valentin','Salvador','Nicolas','Juan Bautista','Maximo','Mia','Tiziano','León','Camila','Clara','Bianca','Milo','Facundo','Vicente','MateoBenjamin','Helena','Zoe','Agustina','Ambar','Ramiro','Manuel','Maria Emilia','Nina','Juan Martin','Julián','Bastian','María Paz','Paulina','Mora','Jeremías','Tiziano Benjamin','Amparo','Juan Pablo','Morena','Franco','Matias','Felicitas','Ciro Benjamin','Santino Benjamin','Luca','Genaro','María Victoria','Lucas','Augusto','Mia Jazmin','Fausto','Mia Valentina','Camilo','Vera','Elena','Giovanni','Lucio','Juliana','Antonella','Antonia','Lautaro Benjamin','Agostina','Luz Milagros','Ana Paula','Matilda','Martin','Constanza','Alejo','Paloma','Juan Manuel','Ian','Benjamín Ezequiel','Gael','Lara','Luciano','Federico','Milagros','Lisandro','Pía','Francesco','Lourdes','Noah','Sara','Bautista Benjamin','Alfonsina','Lupe','Sebastián','Alma Valentina','Zoe Valentina','Candelaria','Octavio','Thiago Nicolas','Alma Jazmin','Juan Francisco','Jonás','Santino Nicolas','Ian Benjamin','Thiago Valentin','Geronimo','MateoNicolás','Zoe Jazmín','Teo','Abril','Tobias','Gino','Abigail','Franchesca','Thiago Ezequiel','Luana','Sol','Justina','Milena ','Maria Pia','Charo','Gonzalo','Alma Mia','Paz','Constantino','Juan','Antonio'];
  apellidos: string[] = ['GONZALEZ','RODRIGUEZ','FERNANDEZ','MARTINEZ','LOPEZ','GOMEZ','GARCIA','PEREZ','SANCHEZ','DIAZ','ROMERO','ALVAREZ','SOSA','RAMIREZ','TORRES','CASTRO','GUTIERREZ','SUAREZ','RUIZ','FLORES','ROJAS','GIMENEZ','BENITEZ','NUÑEZ','ORTIZ','CABRERA','HERRERA','MOLINA','QUIROGA','ACOSTA','MARTIN','PEREYRA','MEDINA','GODOY','MUÑOZ','DOMINGUEZ','FERREYRA','MORALES','AGUIRRE','SILVA','PERALTA','HERNANDEZ','RAMOS','VEGA','MORENO','VERA','VARGAS','VAZQUEZ','VILLALBA','LUNA','AGUERO','JUAREZ','BUSTOS','GUZMAN','PONCE','RIOS','CASTILLO','MIRANDA','MENDEZ','CACERES','BLANCO','NAVARRO','ARIAS','RIVERO','LUCERO','OJEDA','CORREA','PAEZ','DUARTE','CORDOBA','FRANCO','CARDOZO','DELGDO','OLIVERA','AVILA','FIGUEROA','SOTO','MALDONADO','LEDESMA','ACUÑA','FARIAS','MOYANO','AGUILAR','ALONSO','MENDOZA','MANSILLA','CRUZ','ESCOBAR','OVIEDO','ROLDAN','BARRIOS','PAZ','ROSALES','CORONEL','PAREDES','CABALLERO','ALDEZ','SALINAS','ARCE','CARRIZO','MONTENEGRO','SORIA','VELAZQUEZ','CAMPOS','LEIVA','MARQUEZ','REYES','MERCADO','ZARATE','IBAÑEZ','GALLARDO','IBARRA','ORTEGA','AYALA','CONTRERAS','AQUINO','ZAPATA','AGUILERA','BAEZ','HEREDI','CALDERON','BRAVO','PEREIRA','ESCUDERO','JARA','PEÑA','IGLESIAS','PACHECO','VIDELA','LEGUIZAMON','BARRIONUEVO','FUNES','QUINTANA','TOLEDO','VALENZUELA','SOLIS','ROSSI','VIDAL','JIMENEZ','CHAVEZ','GUEVARA','VILLEGAS','GAUA','CEJAS','OLIVA','CABRAL','CUELLO','ACEVEDO','QUEVEDO','QUINTEROS','VARELA','VERGARA','ROMANO','GIL','SEGOVIA','LUJAN','BUSTAMANTE','JOFRE','OTERO','AVALOS','GARAY','RIVAS','OCHOA','VALLEJOS','GUERRERO','PRIETO','ALEGRE','SALAS','ALARCON','GUERRA','SAAVEDRA','PALACIOS','CEBALLOS','ALTAMIRANO','MAIDANA','ALMADA','BARRERA','SERRANO','DURAN','ALMIRON','FERRARI','BURGOS','SANDOVAL','LUQUE','GALVAN','SANTOS','CORTEZ','NIETO','ZABALA','CORIA','ARMIENTO','TAPIA','OLGUIN','ARAUJO','ESPINOSA','VERON','LESCANO','BAZAN','FERREIRA','ARAYA','BRUNO','CANO','SANTILLAN','BARRETO','ARANDA','CENTURION','OCAMPO','COSTA','MONTERO','REYNOSO','VILLANUEVA','VILLAFAÑE','SOTELO','LMEDO','GALARZA','ROCHA','ALBORNOZ','MORAN','FUENTES','VASQUEZ','ALCARAZ','ARGUELLO','GALEANO'];
  
  cantidadRepeticionesSubject: Subject<any>;
  repeticiones: number = 0;

  constructor() {
     this.cantidadRepeticionesSubject = new Subject();  
    this.alumnos = [];
    

    this.alumnosObservable = new Observable<any>((suscriptor) =>
      {

            this.alumnos = [];

            let max = this.getMinMax(10,50);
              for (let i = 0; i < max; i++) {
                this.agregarAleatorios();
              }

              this.repeticiones++;
              this.cantidadRepeticionesSubject.next(this.repeticiones); 
              suscriptor.next(this.alumnos);    

      }
     )

   }

/* Agrega alumnos de manera aleatoria */
public agregarAleatorios() : void
{
    this.contador++;
    let puntaje: number = this.getMinMax(1,100);

    let alumno = {
      apellido : this.apellidos[this.getMinMax(0,this.apellidos.length)],
      nombre : this.nombres[this.getMinMax(0,this.nombres.length)], 
      puntaje: puntaje,  
      examenes: this.getMinMax(Math.ceil(puntaje / 10), (puntaje / 10) + 10 )      
    }

    // Agrega alumno creado aleatoriamente
    this.alumnos.push(alumno);

}

/* Obtiene un valor aleatorio dentro de un rango mínimo y máximo */
private getMinMax(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}


  obtenerObservableAlumnos(controlRepeticiones: boolean){
    if (controlRepeticiones)
    {
    this.repeticiones = 0;
    }
    return this.alumnosObservable;
  }



  obtenerObservableCantidadRepeticiones(){     
    return this.cantidadRepeticionesSubject.asObservable();
  }

  obtenerPromisePromedios(){
    return new Promise((resolve, reject) => {
      if (this.alumnos.length > 0)
      {
        let promedio = 0;
        let alumnoPromise;
        for (let i = 0; i < this.alumnos.length; i++) {
   
          if (this.alumnos[i].puntaje / this.alumnos[i].examenes > promedio)
          {      
            alumnoPromise = this.alumnos[i];
            promedio = this.alumnos[i].puntaje / this.alumnos[i].examenes;
          }    
        }

        resolve(promedio.toFixed(2));
      }
      else
      {
        reject({
          codigo: 0,
          mensaje: "No hay alumnos"
        });
      }
    } );
  }

}
