import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';

let ELEMENT_DATA_USUARIOS: Usuario[] = [];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css','../../../../shared/css/content.css']
})
export class UsuariosComponent implements OnInit {

  columnas: string[] = ['usuario', 'contrasena','admin','nombre','apellido','acciones'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource(ELEMENT_DATA_USUARIOS);
  @ViewChild (MatTable) tabla!: MatTable<Usuario>;
  usuarios$!: Observable<Usuario[]>;

  constructor(
    private dialog: MatDialog,
    private usuariosService: UsuariosService,
    private utilsService: UtilsService
  ) { 

  }

  ngOnInit(): void {
    this.usuarios$ = this.usuariosService.obtenerUsuarios()
  }


  agregarUsuario(){

    const usuario: Usuario = {id: this.utilsService.makeid(), usuario: '', contrasena: '', admin: false, nombre: '', apellido : '' };

    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: 'auto',
      data: {usuario, modo: 'Alta'}
    })

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado)
      {
        this.usuariosService.agregarUsuario(resultado).subscribe((usuario: Usuario) => {        
          this.ngOnInit();
        });   
      }
    })    

  }

  editar(usuario: Usuario){    
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
       width: 'auto',
       data: {usuario, modo: 'Modificación'}      
     })
 
     dialogRef.afterClosed().subscribe(resultado => {
      {
        this.usuariosService.editarUsuario(resultado).subscribe((usuario: Usuario) => {        
          this.ngOnInit();
        });        
      }
     })    
 
   }
 

}
