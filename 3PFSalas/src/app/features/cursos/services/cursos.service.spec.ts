import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { CursosService } from './cursos.service';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Curso } from '../../../models/curso';


describe('CursoService - Tests Unitarios', () => {
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let service: CursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule ],
      providers: [CursosService],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post']);
    service = new CursosService(httpClientSpy as any);
  });

  it('Validar creación del servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Validar retorno de un arreglo de cursos', (done: DoneFn) => {
    const mockDatos = [
      {id:"1",descripcion:"Angular",profesor:"Abner",cargaHoraria:"10"},
      {id:"2",descripcion:"C#",profesor:"García",cargaHoraria:"20"}
    ];

    httpClientSpy.get.and.returnValue(of(mockDatos));

    service.obtenerCursos().subscribe((cursos) => {
      expect(cursos).toEqual(mockDatos);
      done();
    })
  });


  it('Validar agregar un curso', (done: DoneFn) => {
    const mockDatos = {id:"1",descripcion:"Angular",profesor:"Abner",cargaHoraria:"10"};

    httpClientSpy.post.and.returnValue(of(mockDatos));

    service.agregarCurso(mockDatos).subscribe((cursos) => {
      expect(cursos).toEqual(mockDatos);
      done();
    })
  });



});
