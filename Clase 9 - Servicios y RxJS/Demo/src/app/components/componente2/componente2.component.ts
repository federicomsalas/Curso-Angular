import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { RxjsService } from '../../services/rxjs.service';

@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.css']
})
export class Componente2Component implements OnInit {

  alumnos: any[] = [];
  profesores: any[] = [];

  constructor(
    private alumnoService: AlumnoService, 
    private rxjsService: RxjsService
  ) { }

  ngOnInit(): void {
    this.alumnos = this.alumnoService.obtenerAlumnos();
    this.rxjsService.obtenerProfesores().pipe().subscribe(
    {
      next: (profesores) => {
          this.profesores = profesores;
      },
      error: (error) => {
        this.profesores = ['Hubo un error'];
      }
    }
    );
  }

}
