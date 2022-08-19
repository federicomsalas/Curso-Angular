import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';

const routes : Routes = [
    {path: 'cursos', children: [
        {path: 'lista', component: ListaCursosComponent}
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
, exports: [RouterModule] 
})
export class CursosRoutingModule { }
