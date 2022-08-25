import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { EditarDialogComponent } from '../editar-dialog/editar-dialog.component';


export interface Alumno {
  id:string;
  nombre: string;
  apellido: string;
  edad: string;
  mail: string;
  genero: string;
}

let ELEMENT_DATA: Alumno[] = [];

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  columnas: string[] = ['nombre', 'mail','edad','genero','acciones'];
  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild (MatTable) tabla!: MatTable<Alumno>;

  constructor(
    private dialog: MatDialog
  ) { 

    ELEMENT_DATA = JSON.parse(localStorage.getItem('TABLA_ALUMNOS' ) || '[]') as Alumno[];          
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);        
  }

  ngOnInit(): void {
  }


  eliminar(elemento: Alumno){
    this.dataSource.data = this.dataSource.data.filter((alumno: Alumno) => alumno != elemento);
    this.grabarLocalStorage();
  }

  editar(alumno: Alumno){    
   const dialogRef = this.dialog.open(EditarDialogComponent, {
      width: 'auto',
      data: {alumno, modo: 'Modificación'}      
    })

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado)
      {
        const item = this.dataSource.data.find(alumno => alumno.id == resultado.id);        
        const index = this.dataSource.data.indexOf(item!);
        this.dataSource.data[index] = resultado;
        this.tabla.renderRows();
        this.grabarLocalStorage();
      }
    })    

  }

  agregarAlumno(){

    const alumno: Alumno = {id: this.makeid() ,nombre: '', apellido: '', mail: '', edad: '', genero: ''};

    const dialogRef = this.dialog.open(EditarDialogComponent, {
      width: 'auto',
      data: {alumno, modo: 'Alta'}
    })

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado)
      {
          
        this.dataSource.data[this.dataSource.data.length] = resultado;
        this.grabarLocalStorage();
        try {
          this.tabla.renderRows();
        }
        catch {

        }
        
      }
    })    

  }

   makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  

  filtrar(event : Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLowerCase();
  }  

  grabarLocalStorage(){
    localStorage.setItem('TABLA_ALUMNOS', JSON.stringify(this.dataSource.data));    
  }  

}
