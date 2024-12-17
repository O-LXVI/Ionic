import {inject, Injectable} from '@angular/core';
import {LoadingController, ToastController, ToastOptions} from "@ionic/angular";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  asyncCtrl = inject(LoadingController);
  toast = inject(ToastController);
  router =inject(Router);

  loading(){
    return this.asyncCtrl.create({ spinner: 'crescent'})
  }

  async presentToast(opts?: ToastOptions){
    const toast = await this.toast.create(opts);
    toast.present();
  }

  //router

  routerLink(url: string){
    return this.router.navigateByUrl(url)
  }

  guardarLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  obtenerLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }
}
