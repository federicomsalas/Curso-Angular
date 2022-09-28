import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, mergeMap } from 'rxjs/operators';
import { CursosService } from 'src/app/features/cursos/services/cursos.service';
import { cargarCursos, cursosCargados } from './cursos.actions';

@Injectable()
export class CursoEffects {
  cargarCursosEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(cargarCursos),
      mergeMap(() =>
        this.cursosService
          .obtenerCursos()
          .pipe(map((cursos) => cursosCargados({ cursos })))
      )
    )
  );
  constructor(
    private actions$: Actions,
    private cursosService: CursosService
  ) {}
}
