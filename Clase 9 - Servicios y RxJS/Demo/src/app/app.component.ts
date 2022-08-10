import { Component, Inject } from '@angular/core';
import { AlumnoService } from './services/alumno.service';
import { CursoService } from './services/curso.service';
import { CursosAlphaService } from './services/cursos-alpha.service';
import { cursos } from './services/curso.data';
import { Configuracion, configtoken } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';

  alumnos: any[] = [];
  cursos: any[] = [];

  constructor(
    private alumnoService: AlumnoService,
    private cursoService: CursoService,   
    private cursoAlphaService: CursosAlphaService,
    @Inject(configtoken) config:Configuracion
  ){
    this.alumnos = alumnoService.obtenerAlumnos();
    this.cursos = cursoService.obtenerCursos();
   // this.cursos = cursos.obtenerCursos();
    console.log(cursoService === cursoAlphaService);
    console.log(config);
    console.log(config.servicios[0].obtenerCursos());
  }
}
