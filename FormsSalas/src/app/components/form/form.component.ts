import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';


function calcularValidacion(c: FormControl) {

  if (c.parent?.get('validarCb')?.value  == false)
  {      
    return null;
  }

  if (c.parent?.get('examenes')?.value * c.parent?.get('puntaje')?.value  == c.parent?.get('validacion')?.value)
  {    
    return null;
  }
  else
  {
    return  {
      validacionOperacion: false        
    };
  }
  

}

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
export class FormComponent implements OnInit {

  constructor(

    private fb: FormBuilder

  ) { 



  }

  formulario!:  FormGroup;

  ngOnInit(): void {


    this.formulario = this.fb.group({
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('',[Validators.required]),
      puntaje: new FormControl('',[Validators.required , Validators.pattern("^[0-9]*$")]),
      examenes: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$") ]),
      validarCb : new FormControl(true),
      validacion: new FormControl('',[Validators.required,  calcularValidacion])      
    })

  }


  contador: number = 0;
  indiceColores = 0;

  puntaje1: number =  Math.round(Math.random() * 100);
  puntaje2: number = Math.round(Math.random() * 100);
  puntaje3: number = Math.round(Math.random() * 100);

  showModalBox: boolean = true;


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
  alumnos!: Alumnno[];

/* Obtiene color de fondo */
getColor(persona: any) {
  //Según posición en lista, se calcula el proporcional del alpha para genera gradiente
  return 'rgba('+ this.colores[this.indiceColores] +', ' + this.alumnos.indexOf(persona)  / this.alumnos.length + ') ';
  
}

public mostrarModal() {

  if(this.showModalBox == false){
    this.showModalBox = true;
  } else {
    this.showModalBox = false;
  }
}

public getDisplay() {
  if(this.showModalBox == true){
    return "block";
  } else {
     return "none";
  }
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


/* Marca/Desmarca un alumno como seleccionado */
public seleccionar(alumno: any) : void
{
  alumno.seleccionado = ! alumno.seleccionado;
}

/* Agrega alumno según datos en input forms */
public agregarAlumno() : void
{

  this.validateAllFormFields(this.formulario);

  if (this.formulario.get('validarCb')?.value == false)
  {
    this.formulario.get('validacion')?.setValue("0");
  }

  if (this.formulario.valid == false || this.revisarPromedio() == true)
  {
    return;
  }



  let alumno = {
    nombre: this.formulario.get('nombre')?.value,
    apellido:  this.formulario.get('apellido')?.value,
    puntaje:  this.formulario.get('puntaje')?.value,
    examenes:  this.formulario.get('examenes')?.value,
    validarCb: true,
    validacion:  this.formulario.get('validacion')?.value,
    posicion: 0,
    seleccionado: false
  };


  let encontrado: boolean = false;
  /* Se recorren todos los alumnos para: */
  /* 1 - Insertar alumno nuevo en su posición correcta */
  /* 2 - Reordenar posición de los demás alumnos */
  if (this.alumnos != null)
  {
    for (let i = 0; i < this.alumnos.length; i++) {
      if (alumno.examenes < this.alumnos[i].examenes && encontrado == false)
      {
        alumno.posicion = i+1;
        this.alumnos.splice(i,0,alumno);
        encontrado = true;
      }
      this.alumnos[i].posicion = i+1;
    }
  }
  else
    {
      alumno.posicion = 1;
      this.alumnos = [];
      this.alumnos?.push(alumno);
      encontrado = true;
    }


  /* Si no se encontró valor menor, se agrega el final del array */
  if (encontrado == false)
  {   
    alumno.posicion = this.alumnos.length+1; 
    this.alumnos.push(alumno);
  }

  /* Se limpian variables del input */
  this.reset();  

  this.mostrarModal();
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


  isFieldValid(field: string) {

    return  ! this.formulario!.get(field)!.valid && this.formulario!.get(field)!.touched;
    
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }  

  reset(){
    this.formulario.reset();
    this.formulario.get('validarCb')?.setValue(true);
  }  

  revisarPromedio(){
    if (this.formulario.get('examenes')?.valid && this.formulario.get('puntaje')?.valid)
    {
      if (this.formulario.get('puntaje')?.value / this.formulario.get('examenes')?.value > 10)
      {      
        return true;
      } 
    }
    return false;
  }



  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {      
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }  



}
