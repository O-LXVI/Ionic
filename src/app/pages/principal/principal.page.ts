import {Component, inject, OnInit} from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import {WeatherService} from "../../weather.service";
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { Capacitor } from '@capacitor/core';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'
import {barcode, barcodeSharp} from "ionicons/icons";
import {UtilsService} from "../../service/utils.service";
import {AuthService} from "../../service/auth.service";


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {AttendanceService} from "../../service/attendance.service";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  weatherData: any;
  segment = 'scan';
  qrText = 'Manuel'

  scanResult='';
  message: string = '';

  utilsSvc = inject(UtilsService);

  constructor(
    public alertController: AlertController,
    private weatherService: WeatherService,
    private modalController: ModalController,
    private platform: Platform,
    private authService: AuthService,
    private attendaceService: AttendanceService,){ }

  ngOnInit() {
    this.getWeather('');
    if(this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        lensFacing: 'Back',
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.barcode?.displayValue) {
      this.scanResult = data.barcode.displayValue;
      await this.registerAttendance(this.scanResult);
    }
  }

  async registerAttendance(qrData: string) {
    try {
      // Obtener UID del usuario autenticado
      const currentUser = await this.authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('Usuario no autenticado.');
      }

      const uid = currentUser.uid;

      // Registrar asistencia
      await this.attendaceService.registerAttendance(qrData, uid);
      this.message = 'Asistencia registrada correctamente.';
    } catch (error) {
      this.message = error.message || 'Error al registrar asistencia.';
      console.error('Error:', error);
    }
  }

  //API CLIMA

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe(
      data => {
        this.weatherData = data;
        console.log(this.weatherData); //verifica que los datos se están recibiendo
      },
      error => {
        console.error('Error clima:', error);
      }
    );
  }

  //Cerrar sesion y cosas

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de sesion cancelado!');
          }
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.utilsSvc.presentToast({
              message: 'Hasta la proxima',
              duration: 2500,
              color: "primary",
              position: "middle",
              icon: "alert-circle-outline"
            })
            this.utilsSvc.routerLink('/login')
          }
        }
      ],
    });

    await alert.present();

  }
}
