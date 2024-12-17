import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Usuario autenticado:', userCredential.user);
      return userCredential.user; // Devuelve el objeto 'User'
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    console.log('Sesión cerrada.');
  }

  async getCurrentUser(): Promise<User | null> {
    return await this.afAuth.currentUser;
  }
}
