import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearNotasPage } from './crear-notas.page';

const routes: Routes = [
  {
    path: '',
    component: CrearNotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearNotasPageRoutingModule {}
