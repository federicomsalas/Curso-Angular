import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, from, scan, filter, map, tap, of, mergeMap, interval, forkJoin, delay, take } from 'rxjs';
import { RxjsService } from './services/rxjs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit{

  profesores: any = [];
  cursos: any = [];
  cursoSuscription: Subscription;
  cursos$: Observable<any>;

  constructor(
    private rxjsService: RxjsService
  ) {
    // this.rxjsService.obtenerPromiseProfesores()
    // .then(
    //   (profesores) => {
    //     console.log("Promise: " , profesores);
    //     this.profesores = profesores;
    //   }
    // )
    // .catch(
    //   (error) => {
    //     console.log(error);
    //   }
    // )

    this.rxjsService.obtenerObservableProfesores().subscribe((profesores) => 
    {
      this.profesores = profesores;
      console.log("Observable: " , profesores);
    });

    this.cursoSuscription = this.rxjsService.obtenerObservableCursos().subscribe((cursos) => 
    {
      this.cursos = cursos;
    });

    this.cursos$ = this.rxjsService.obtenerObservableCursos();

    console.log(this.cursos$);

  }

  agregarNuevoProfesor(){
    let profesor = {id: 5, nombre: "Feasdde", curso: "x"};
    let curso = {id: 1, nombre: "UI/UX", comision: "32300"};
    //this.rxjsService.agregarNuevoProfesor(profesor);
    this.rxjsService.agregarNuevoCurso(curso);
  }

  ngOnInit(): void {
    this.rxjsService.obtenerObservableAlumnos().pipe(
      map((alumnos: any[]) => alumnos.filter(alumno => alumno.curso === 'Angular'))
    ).subscribe((alumnos) => {
      console.log('Desde el subscribe de alumnos', alumnos);
    });
    

/*
    from([1,2,3,4,5,6,7,8,9,10]).pipe(  
        tap( valor => console.log("Antes",valor) ),    
        scan((acumulador: number, valor : number) =>  acumulador + valor),
        filter((valor:number) => valor % 2 === 0),
        tap( valor => console.log("Antes",valor)))    
        .subscribe((data) => {
        console.log(data);
        } );

      const letras = of('a','b','c');
      letras.pipe(
        mergeMap(
          x => interval(1000).pipe(
            map(i => x+i)
          )
        )
      ).subscribe(x => console.log("MegeMap:", x));
    */
      const fork = forkJoin(
        {
          sourceOne: of("Hola"),
          sourceTwo: of("Mundo").pipe(delay(1000))          
        }
      ).subscribe((datos) => {
        console.log("FORKJOIN" ,datos)
      })
  }

  ngOnDestroy(): void {
    console.log("Ejecutando ngOnDestroy para unsuscribe");
    this.cursoSuscription.unsubscribe();
  }

}
