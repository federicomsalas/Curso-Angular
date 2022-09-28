import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, mergeMap } from 'rxjs/operators';
import { cargarAlumnos, alumnosCargados } from './alumnos.action';
import { AlumnosService } from 'src/app/features/alumnos/services/alumnos.service';

@Injectable()
export class AlumnosEffects {
  cargarAlumnosEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(cargarAlumnos),
      mergeMap(() =>
        this.alumnosService
          .obtenerAlumnos()
          .pipe(map((alumnos) => alumnosCargados({ alumnos })))
      )
    )
  );
  constructor(
    private actions$: Actions,
    private alumnosService: AlumnosService
  ) {}
}
