import { Component, OnInit } from '@angular/core';
import { CuentaService } from "../../cuenta.service";
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cambio-contrasenia',
  templateUrl: './cambio-contrasenia.page.html',
  styleUrls: ['./cambio-contrasenia.page.scss'],
})
export class CambioContraseniaPage implements OnInit {

  usuario: string = '';
  nuevaContrasenia: string = '';
  confirmarContrasenia: string = '';

  constructor(private cuentaService: CuentaService, public alertController: AlertController,) { }

  ngOnInit() {
  }

  async cambiarContrasenia() {
    if (this.nuevaContrasenia !== this.confirmarContrasenia) {
      const alert = await this.alertController.create({
        header: 'Datos Incorrectos',
        message: 'Las contraseñas no coinciden.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
    const exito = this.cuentaService.modificarContrasenia(this.usuario, this.nuevaContrasenia);
    if (exito) {
      const alert = await this.alertController.create({
        header: 'Exito!',
        message: 'Las contraseñas no coinciden.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    } else {
      const alert = await this.alertController.create({
        header: 'Datos Incorrectos!',
        message: 'Usuario no encontrado.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
  }
}
