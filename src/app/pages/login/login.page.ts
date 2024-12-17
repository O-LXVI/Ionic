import {Component, inject, OnInit} from '@angular/core';
import { from } from 'rxjs';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {FirebaseService} from "../../service/firebase.service";
import {User} from "../../modelos/usuario.modelo";
import {UtilsService} from "../../service/utils.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as User).then(result => {

        this.getUserInfo(result.user.uid)

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

  async getUserInfo(uid: string) {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `/users/${uid}`;

      this.firebaseSvc.getDocument(path).then( (user: User) => {

        this.utilsSvc.guardarLocalStorage('user', user)
        this.utilsSvc.routerLink('/principal');
        this.form.reset();

        this.utilsSvc.presentToast({
          message: `Bienvenido ${user.name}`,
          duration: 1500,
          color: "primary",
          position: "middle",
          icon: "person-circle-outline"
        })


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
