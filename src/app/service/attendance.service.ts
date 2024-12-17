import { Injectable } from '@angular/core';
import { collection, doc, setDoc, getDoc, getDocs } from '@firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private firestore: Firestore) {}

  async registerAttendance(qrData: string, userId: string): Promise<void> {
    const [asignatura, seccion, sala, fecha] = qrData.split('|');
    const attendanceDoc = doc(this.firestore, `Asistencias/${userId}/${fecha}`);

    const snapshot = await getDoc(attendanceDoc);
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data[qrData]) {
        throw new Error('Ya has registrado esta asignatura hoy.');
      }
    }
    await setDoc(attendanceDoc, { [qrData]: true }, { merge: true });
  }

  async getAttendanceList(userId: string): Promise<{ [day: string]: string[] }> {
    const attendanceRef = collection(this.firestore, `Asistencias/${userId}`);
    const snapshot = await getDocs(attendanceRef);
    const attendanceByDay: { [day: string]: string[] } = {};

    snapshot.forEach((doc) => {
      const day = doc.id; // Fecha como ID del documento
      const data = doc.data();
      attendanceByDay[day] = Object.keys(data);
    });

    return attendanceByDay;
  }

}

