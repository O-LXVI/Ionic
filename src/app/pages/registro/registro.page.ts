import {Component, inject, OnInit} from '@angular/core';
import { from } from 'rxjs';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {FirebaseService} from "../../service/firebase.service";
import {User} from "../../modelos/usuario.modelo";
import {UtilsService} from "../../service/utils.service";
import {setUserId} from "@angular/fire/analytics";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

        this.firebaseSvc.signUp(this.form.value as User).then( async result => {

        await this.firebaseSvc.updateUser(this.form.value.name)

          let uid = result.user.uid;
          this.form.controls.uid.setValue(uid);

          this.setUserInfo(uid)

      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: "primary",
          position: "middle",
          icon: "alert-circle-outline"
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  async setUserInfo(uid: string) {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `/users/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc.setDocument(path, this.form.value).then( async result => {

        this.utilsSvc.guardarLocalStorage('user', this.form.value)
        this.utilsSvc.routerLink('/principal');
        this.form.reset();

      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: "primary",
          position: "middle",
          icon: "alert-circle-outline"
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

}
