import { Component, OnInit,  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrearNotasPage} from "../crear-notas/crear-notas.page";

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  selectedDate: string | null = null; // 'string' porque ion-datetime devuelve una fecha en formato ISO


  constructor(private modalController: ModalController) { }



  async onDateSelected(event: any) {
    this.selectedDate = event.detail.value; // Fecha seleccionada en formato ISO
    console.log('Fecha seleccionada:', this.selectedDate);

    const modal = await this.modalController.create({
      component: CrearNotasPage,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.note) {
        console.log('Nota guardada para', this.selectedDate, ':', result.data.note);
        // Aquí puedes guardar la nota asociada a la fecha en una base de datos o almacenamiento local.
      }
    });

    await modal.present();
  }

  ngOnInit() {
  }

}
