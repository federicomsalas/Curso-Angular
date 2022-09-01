import { Alumno } from "./alumno";
import { Curso } from "./curso";

export interface Inscripcion {
    id:string;
    curso: Curso; 
    alumno: Alumno;   
  }