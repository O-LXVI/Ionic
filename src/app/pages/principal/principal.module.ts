import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';

import { QrCodeModule } from 'ng-qrcode';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import {environment} from "../../../environments/environment";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPageRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, // Módulo para autenticación
    AngularFirestoreModule, // Módulo para Firestore
    QrCodeModule
  ],
  declarations: [PrincipalPage, BarcodeScanningModalComponent],
})
export class PrincipalPageModule {}
