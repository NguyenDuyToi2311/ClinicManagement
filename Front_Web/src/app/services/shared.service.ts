import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIurl = "http://localhost:8000/api/";
  readonly PhotoURL = "http://localhost:8000/api/media/";

  constructor(private http: HttpClient) { }

  // lưu trữ hình ảnh
  UploadPhoto(val: any) {
    // return this.http.post(this.APIurl + 'savefile/', val)
    return this.http.post(this.APIurl + 'savefile/', val)
  }

  //Specialty (chuyên khoa)
  getSpecialty(): Observable<any[]> {
    return this.http.get<any[]>(this.APIurl + 'specialty/');
  }
  getObjSpecialty(val: any) {
    return this.http.get<any>(this.APIurl + 'specialty/' + val);
  }
  postSpecialty(val: any) {
    return this.http.post(this.APIurl + 'specialty/', val);
  }
  putSpecialty(val: any) {
    return this.http.put(this.APIurl + 'specialty/', val);
  }
  deleteSpecialty(val: any) {
    return this.http.delete(this.APIurl + 'specialty/' + val);
  }

  //patient (bệnh nhân)
  getPatient(): Observable<any[]> {
    return this.http.get<any[]>(this.APIurl + 'patient/')
  }
  getobjPatient(val: any) {
    return this.http.get<any>(this.APIurl + 'patient/' + val)
  }
  postPatient(val: any) {
    return this.http.post(this.APIurl + 'patient/', val)
  }
  putPatient(val: any) {
    const patientId = val.patient_id;
    return this.http.put(this.APIurl + 'patient/' + patientId + '/', val)
  }
  putPartialPatient(val: any): Observable<any> {
    const patientId = val.patient_id;
    return this.http.put(this.APIurl + 'patient/' + patientId + '/', val);
  }
  deletetPatient(val: any) {
    return this.http.delete(this.APIurl + 'patient/' + val)
  }

  getPatentPending(val: any) {
    return this.http.get<any>('http://localhost:8000/api/list_patient_pending/' + val)
  }
  getPatentWaiting(val: any) {
    return this.http.get<any>('http://localhost:8000/api/list_patient_waiting/' + val)
  }
  getPatentFinish(val: any) {
    return this.http.get<any>('http://localhost:8000/api/list_patient_finish/' + val)
  }

  getMedicalRecordPatient(val: any) {
    return this.http.get<any>('http://localhost:8000/api/list_medicalrecord/' + val)
  }



  //doctor
  getDoctor(): Observable<any[]> {
    return this.http.get<any>(this.APIurl + 'doctor/')
  }

  getobjDoctor(val: any) {
    return this.http.get<any>(this.APIurl + 'doctor/' + val)
  }
  postDoctor(val: any) {
    return this.http.post(this.APIurl + 'doctor/', val)
  }
  putDoctor(val: any): Observable<any> {
    const DoctorId = val.dt_id;
    return this.http.put(this.APIurl + 'doctor/' + DoctorId + '/', val)
  }
  putPartialDoctor(val: any): Observable<any> {
    const DoctorId = val.dt_id;
    return this.http.put(this.APIurl + 'doctor/' + DoctorId + '/', val);
  }
  // deletetDoctor(val: any) {
  //   return this.http.delete(this.APIurl + 'doctor/' + val)
  // }
  getDoctorPending(val: any) {
    return this.http.get<any>('http://localhost:8000/api/list_doctor_pending/' + val)
  }
  getDoctorWaiting(val: any) {
    return this.http.get<any>('http://localhost:8000/api/list_doctor_waiting/' + val)
  }
  getDoctorFinish(val: any) {
    return this.http.get<any>('http://localhost:8000/api/list_doctor_finish/' + val)
  }

  // appointment
  getAppoint(): Observable<any[]> {
    return this.http.get<any>(this.APIurl + 'appointment/')
  }
  postAppointment(val: any) {
    return this.http.post(this.APIurl + 'appointment/', val)
  }
  putPartialAppointment(val: any): Observable<any> {
    const appointmentId = val.apm_id;
    return this.http.put(this.APIurl + 'appointment/' + appointmentId + '/', val)
  }
  deleteAppointment(val: any) {
    return this.http.delete(this.APIurl + 'appointment/' + val)
  }
  retrieveAppointment(val: any) {
    return this.http.get<any>(this.APIurl + 'appointment/' + val)
  }

  // tạo phiếu khám và hóa đơn

  // ", val" gửi dữ liệu trong thân yêu cầu POST
  // "+ val" thêm giá trị ào cuối URL và không gửi dữ liệu trong thân yêu cầu POST
  postMedicalrecord(val: any) {
    return this.http.post(this.APIurl + 'medicalrecord/', val)
  }
  getRecord(): Observable<any[]> {
    return this.http.get<any>(this.APIurl + 'medicalrecord/')
  }
  deleteRecord(val: any) {
    return this.http.delete(this.APIurl + 'medicalrecord' + val)
  }

  getObjRecord(val: any) {
    return this.http.get<any>(this.APIurl + 'medicalrecord/' + val)
  }
  putRecord(val: any):  Observable<any> {
    const RecordId = val.medicalrecord_id;
    return this.http.put(this.APIurl + 'medicalrecord/' + RecordId + '/', val);
  }

  getInvoice(): Observable<any[]> {
    return this.http.get<any>(this.APIurl + 'invoice/')
  }
}
