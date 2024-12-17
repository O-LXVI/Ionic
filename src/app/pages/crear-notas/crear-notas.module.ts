import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearNotasPageRoutingModule } from './crear-notas-routing.module';

import { CrearNotasPage } from './crear-notas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearNotasPageRoutingModule
  ],
  declarations: [CrearNotasPage],
  exports: [CrearNotasPage]
})
export class CrearNotasPageModule {}
