import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { ServicioAlumnosService } from '../../services/servicio-alumnos.service';
import { interval, map, mergeMap, Observable, timer, tap, Subject, Subscription, filter, takeUntil } from 'rxjs';



export class Alumnno
{
  nombre: string = "";
  apellido: string = "";
  puntaje: number = 0;
  examenes:  number = 0;
  posicion:  number = 0;  
  seleccionado: boolean= false;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  alumnos: any = [];
  recargaSubject = new Subject();
  suscripcionAlumnos = new Subscription();
  timer$: Subscription;
  cantidadRepeticiones$!: Observable<any>;
  alumnoMejorPromedio: any;
  valorPromedio: any = "?";
  totalAlumnos: number = 0;
  filtrar: string = "0";
  timerAlumnos: Observable<any>;

  constructor(

    private servicioAlumnoService: ServicioAlumnosService
  ) {     

    /* Cantidad de repeticiones Async*/
    this.cantidadRepeticiones$ = this.servicioAlumnoService.obtenerObservableCantidadRepeticiones(); 

    /* Timer recarga */
    this.timer$ = timer(0, 1000).subscribe(value => {      
      this.recargaSubject.next( (10-(Math.abs(value*1000) % 10000  / 1000)).toFixed(0).toString()  ) ;     
    });

  
    let controlRepeticiones = true;
    
    this.timerAlumnos = timer(0,10000);

    /* Observable Alumnos*/
    this.suscripcionAlumnos =  this.timerAlumnos
    .pipe(
        mergeMap((alumnos) => this.servicioAlumnoService.obtenerObservableAlumnos(controlRepeticiones))
        , tap( alumnos => this.totalAlumnos = alumnos.length )    
        ,map((alumnos: any[]) => alumnos.filter(alumno => alumno.puntaje / alumno.examenes > parseInt(this.filtrar || "0")))   
    )
    .subscribe(alumnos => this.alumnos = alumnos);

    setTimeout(() => controlRepeticiones = false, 1000);
    
  }

  ngOnInit(): void {

  }


  contador: number = 0;
  indiceColores = 0;

  /* Array para cambiar colores del listado */
  colores: string[] = ['0, 128, 255', '255,0,0'
  ,'0,255,0'
  ,'0,0,255'
  ,'255,255,0'
  ,'0,255,255'
  ,'255,0,255'
  ,'192,192,192'
  ,'128,128,128'
  ,'128,0,0'
  ,'128,128,0'
  ,'0,128,0'
  ,'128,0,128'
  ,'0,128,128'
  ,'0,0,128'];


/* Obtiene color de fondo */
getColor(persona: any) {
  //Según posición en lista, se calcula el proporcional del alpha para genera gradiente
  return 'rgba('+ this.colores[this.indiceColores] +', ' + this.alumnos.indexOf(persona)  / this.alumnos.length + ') ';
  
}


/* Marca/Desmarca un alumno como seleccionado */
public seleccionar(alumno: any) : void
{
  alumno.seleccionado = ! alumno.seleccionado;
}


/* Devuelve si el alumno es el mejor promedio de la lista */
public mejorPromedio(alumno: any) : boolean
{

  for (let i = 0; i < this.alumnos.length; i++) {
   
    if (alumno.puntaje / alumno.examenes < this.alumnos[i].puntaje /  this.alumnos[i].examenes)
    {      
      return false;
    }    
  }
  
  return true;
}

  obtenerPromisePromedios(){
    this.servicioAlumnoService.obtenerPromisePromedios()
    .then(
      (valorPromedio) => {
        this.valorPromedio = valorPromedio;
      }
    )
    .catch(
      (error) => {
        console.log(error);
      }
    )
  }
  ngOnDestroy(): void {    
      this.timer$.unsubscribe();
      this.suscripcionAlumnos.unsubscribe();      
  }

}
