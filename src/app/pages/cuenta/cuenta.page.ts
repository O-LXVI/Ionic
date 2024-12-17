import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  usuario = {
    nombre: 'Manuel Ignacio',
    apellido: 'Bastidas Ibarra',
    correo: 'man.bastidas@duocuc.cl',
    sede: 'San joaquin',
    carrera: 'Ingeniería en Informática'
  };

  constructor() { }

  ngOnInit() {}
}
