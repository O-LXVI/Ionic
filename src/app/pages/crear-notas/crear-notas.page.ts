import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crear-notas',
  templateUrl: './crear-notas.page.html',
  styleUrls: ['./crear-notas.page.scss'],
})
export class CrearNotasPage implements OnInit {
contenidoNotas: string= '';
notas: string[] = [];

  constructor(private modalController: ModalController) { }

  dismiss() {
    this.modalController.dismiss();
  }

  saveNote() {
    if (this.contenidoNotas.trim()) {  // Verifica si la nota no está vacía
      this.notas.push(this.contenidoNotas);  // Agrega la nueva nota a la lista
      this.contenidoNotas = '';  // Resetea el campo de entrada
    }
  }

  ngOnInit() {
  }

}
