import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'contacto', component: ContactoComponent},  
  {path: 'contacto', component: ContactoComponent},  
  {path: 'autenticacion', component:AutenticacionComponent, children: [
    {path: 'usuarios', component: UsuariosComponent  },
    {path: 'usuarios/:id', component: UsuariosComponent  }
    ]
  },
  {path: '', redirectTo:'inicio', pathMatch:'full'},
  {path: '**', component: PaginaNoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
