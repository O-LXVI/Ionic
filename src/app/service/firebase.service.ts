import {inject, Injectable} from '@angular/core';
import { AngularFireAuth} from "@angular/fire/compat/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  user
} from "@angular/fire/auth";
import {User} from "../modelos/usuario.modelo";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {getFirestore, setDoc, doc, getDoc, collection} from "@angular/fire/firestore";
import {UtilsService} from "./utils.service";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor() {}

  firestore = inject(AngularFirestore);
  auth = inject(AngularFireAuth);
  utilsSvc = inject(UtilsService);


  //autentificacion
  getAuth(){
    return getAuth();
  }

  // acceder
  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Crear
  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Editard
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName});
  }

  //cerrar sesion
  singOut(){
    getAuth().signOut();
    localStorage.removeItem("user");
    this.utilsSvc.routerLink('/login')
  }

  //base de datos

  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string,){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  // Registrar asistencia
  async registrarAsistencia(qrData: string, uid: string): Promise<void> {
    const [asignatura, seccion, sala, fecha] = qrData.split('|');
    const asistenciaRef = this.firestore.doc(`Asistencias/${uid}/${fecha}`);

    // Obtener documento actual (si existe)
    const snapshot = await firstValueFrom(asistenciaRef.get());
    const data = snapshot.data();

    if (data && data[qrData]) {
      throw new Error('Ya has registrado esta asignatura hoy.');
    }

    // Actualizar documento con nueva asistencia
    await asistenciaRef.set({ [qrData]: true }, { merge: true });
  }

  // Obtener lista de asistencias
  async listaAsistencia(uid: string): Promise<{ [day: string]: string[] }> {
    const coleccionAsistencia = this.firestore.collection(`Asistencias/${uid}`);
    const snapshot = await firstValueFrom(coleccionAsistencia.get());
    const asistenciaPorDia: { [day: string]: string[] } = {};

    snapshot.forEach((doc) => {
      const day = doc.id; // La fecha es el ID del documento
      const data = doc.data();
      asistenciaPorDia[day] = Object.keys(data || {});
    });

    return asistenciaPorDia;
  }
}
