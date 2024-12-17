import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  constructor() {}

  modificarContrasenia(usuario: string, nuevaContrasenia: string): boolean {
    const cuentasGuardadas = JSON.parse(localStorage.getItem('cuentas') || '[]') as { usuario: string; contrasenia: string }[];
    const cuentaIndex = cuentasGuardadas.findIndex((cuenta: { usuario: string; contrasenia: string }) => cuenta.usuario === usuario);

    if (cuentaIndex !== -1) {
      cuentasGuardadas[cuentaIndex].contrasenia = nuevaContrasenia;
      localStorage.setItem('cuentas', JSON.stringify(cuentasGuardadas));
      console.log('Contraseña modificada con éxito');
      return true;
    } else {
      console.log('Usuario no encontrado');
      return false;
    }
  }
}
