import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CursosComponent } from './cursos.component';
import { CursosService } from '../../services/cursos.service';
import { of } from 'rxjs';
import {  MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('CursosComponents - Tests Unitarios', () => {
  let component: CursosComponent;
  let fixture: ComponentFixture<CursosComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let service: CursosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
        , HttpClientTestingModule,
        StoreModule.forRoot({}),
        MatSnackBarModule,    
      ],
      declarations: [ CursosComponent ]
      ,providers : [
        { provide: MatDialog, useValue: {}},                
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosComponent);
    component = fixture.componentInstance;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CursosService(httpClientSpy as any);
    fixture.detectChanges();
  });
  

  it('El componente se crea correctamente', () => {
    expect(component).toBeTruthy();
  });



  it('Debe retornar un arreglo de cursos', (done: DoneFn) => {
    const mockDatos = [
      {id:"1",descripcion:"Angular",profesor:"Abner",cargaHoraria:"20"},
      {id:"2",descripcion:"C#",profesor:"Abner",cargaHoraria:"20"}
    ];

    httpClientSpy.get.and.returnValue(of(mockDatos));

    service.obtenerCursos().subscribe((cursos) => {
      expect(cursos).toEqual(mockDatos);
      done();
    })
});

});
