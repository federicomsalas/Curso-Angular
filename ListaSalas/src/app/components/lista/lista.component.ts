import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor() { }

  /* Para inputs form */
  apellidoAlumno: string = "";
  nombreAlumno: string = "";
  puntajeAlumno: number = 0;
  examenesAlumno: number = 0;  

  contador: number = 0;
  indiceColores = 0;

  puntaje1: number =  Math.round(Math.random() * 100);
  puntaje2: number = Math.round(Math.random() * 100);
  puntaje3: number = Math.round(Math.random() * 100);

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

  /* Inicialización de objeto Alumnos */
  alumnos = [{
    nombre: 'Federico',
    apellido: 'Salas',
    puntaje: 24,
    examenes: 4,
    posicion: 1,
    seleccionado: false

  },
  {
    nombre: 'Eduardo',
    apellido: 'Riccillo',
    puntaje: 35,
    examenes: 5,
    posicion: 2,
    seleccionado: false
  }
  ,
  {
    nombre: 'Juan',
    apellido: 'Torres',    
    puntaje: 35,
    examenes: 6,
    posicion: 3,
    seleccionado: false
  }    

];

/* Obtiene color de fondo */
getColor(persona: any) {
  //Según posición en lista, se calcula el proporcional del alpha para genera gradiente
  return 'rgba('+ this.colores[this.indiceColores] +', ' + this.alumnos.indexOf(persona)  / this.alumnos.length + ') ';
  
}

/* Cambia de colores de manera cíclica */
public cambiarColores() : void{
  if (this.indiceColores < this.colores.length -1)
  {
    this.indiceColores++;
  }
  else
  {
    this.indiceColores = 0;
  }
}

/* Borra alumnos seleccionados */
public borrarAlumno() : void
{
  let borrado: boolean = false;
  for (let i = this.alumnos.length -1; i >= 0; i--) {
    /* Si el alumno está seleccionado, se borrar */
    if (this.alumnos[i].seleccionado == true )
    {
      borrado = true;
      this.alumnos.splice(i,1);
    }    
  }

  if (borrado == false)
  {
    alert("No hay ningún alumno seleccionado!");
  }
  
}

/* Borra todos los alumnos del array de Alumnos */
public borrarTodos() : void
{
   this.alumnos = [];
   this.contador = 0;  
}

/* Agrega 10 alumnos de manera aleatoria */
public agregarAleatorios() : void
{
  for (let i = 0; i < 10; i++) {
    this.contador++;
    this.apellidoAlumno = "Apellido " + this.contador;
    this.nombreAlumno = "Nombre " + this.contador;

    let puntaje1: number = this.getMinMax(1,100);
    this.puntajeAlumno =  puntaje1;

    /* Se calcula una cantidad de exámenes que respete el puntaje onbtenido */
    this.examenesAlumno = this.getMinMax(Math.ceil(puntaje1 / 10), (puntaje1 / 10) + 10 );

    this.agregarAlumno();
  }
}

/* Marca/Desmarca un alumno como seleccionado */
public seleccionar(alumno: any) : void
{
  alumno.seleccionado = ! alumno.seleccionado;
}

/* Agrega alumno según datos en input forms */
public agregarAlumno() : void
{

  if (this.apellidoAlumno == "")
{
  alert("Debe completar el apellido del alumno.");
  return;
}
  
if (this.nombreAlumno == "")
{
  alert("Debe completar el nombre del alumno.");
  return;
}

if (this.puntajeAlumno == 0)
{
  alert("Debe completar el puntaje del alumno.");
  return;
}

if (this.examenesAlumno == 0)
{
  alert("Debe completar la cantidad de exámenes del alumno.");
  return;
}

if (this.puntajeAlumno / this.examenesAlumno > 10)
{
  alert("El promedio da mayor a 10, debe revisar puntuación o cantidad de exámenes." + this.puntajeAlumno + " - " + this.examenesAlumno);
  return;
}

/* Inicialización de objeto */
  let alumno = {
    nombre: this.nombreAlumno,
    apellido: this.apellidoAlumno,
    puntaje: this.puntajeAlumno,
    examenes: this.examenesAlumno,
    posicion: 0,
    seleccionado: false
  };


  let encontrado: boolean = false;
  /* Se recorren todos los alumnos para: */
  /* 1 - Insertar alumno nuevo en su posición correcta */
  /* 2 - Reordenar posición de los demás alumnos */
  for (let i = 0; i < this.alumnos.length; i++) {
    if (alumno.examenes < this.alumnos[i].examenes && encontrado == false)
    {
      alumno.posicion = i+1;
      this.alumnos.splice(i,0,alumno);
      encontrado = true;
    }
    this.alumnos[i].posicion = i+1;
  }

  /* Si no se encontró valor menor, se agrega el final del array */
  if (encontrado == false)
  {   
    alumno.posicion = this.alumnos.length+1; 
    this.alumnos.push(alumno);
  }

  /* Se limpian variables del input */
  this.nombreAlumno = "";
  this.apellidoAlumno = "";
  this.puntajeAlumno = 0;
  this.examenesAlumno = 0;  

}

/* Obtiene un valor aleatorio dentro de un rango mínimo y máximo */
private getMinMax(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

/* Devuevle si el alumno es el mejor promedio de la lista */
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

  ngOnInit(): void {
  }

}
