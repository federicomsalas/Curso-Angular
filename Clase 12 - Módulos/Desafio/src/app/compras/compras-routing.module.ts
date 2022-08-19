import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComprasComponent } from './components/lista-compras/lista-compras.component';
import { CarritoComprasComponent } from './components/carrito-compras/carrito-compras.component';
import { CancelarComprasComponent } from './components/cancelar-compras/cancelar-compras.component';

const routes: Routes = [
  {path: 'compras', children:[
    {path: 'lista', component: ListaComprasComponent},
    {path: 'carrito', component: CarritoComprasComponent},
    {path: 'cancelar', component: CancelarComprasComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
