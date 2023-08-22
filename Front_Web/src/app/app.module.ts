import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppUserLayoutComponent } from './layout/app-user-layout/app-user-layout.component';
import { AddDoctorComponent } from './components/doctor/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './components/doctor/edit-doctor/edit-doctor.component';
import { ListDoctorComponent } from './components/doctor/list-doctor/list-doctor.component';
import { ProfileDoctorComponent } from './components/profile-doctor/profile-doctor.component';
import { ProfilePatientComponent } from './components/profile-patient/profile-patient.component';
import { AboutComponent } from './components/about/about.component';
import { AppAdminLayoutComponent } from './layout/app-admin-layout/app-admin-layout.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecialtyComponent } from './components/specialty/specialty.component';
import { SharedService } from './services/shared.service';
import { CommonModule } from '@angular/common';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { EditPatientComponent } from './components/patient/edit-patient/edit-patient.component';
import { ListPatientComponent } from './components/patient/list-patient/list-patient.component';
import { PageListDoctorComponent } from './components/page-list-doctor/page-list-doctor.component';
import { DetailDoctorComponent } from './components/detail-doctor/detail-doctor.component';
import { AuthGuard } from './guard/auth.guard';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { WaitingPtComponent } from './components/period-patient/waiting-pt/waiting-pt.component';
import { FinishedPtComponent } from './components/period-patient/finished-pt/finished-pt.component';
import { ListMedicalrecordComponent } from './components/period-patient/list-medicalrecord/list-medicalrecord.component';
import { DoctorGuard } from './guard/doctor.guard';
import { WaitingDtComponent } from './components/period-doctor/waiting-dt/waiting-dt.component';
import { FinishDtComponent } from './components/period-doctor/finish-dt/finish-dt.component';
import { MedicalRecordComponent } from './components/period-doctor/medical-record/medical-record.component';
import { ListAppointmentComponent } from './components/list-appointment/list-appointment.component';
import { ListInvoiceComponent } from './components/list-invoice/list-invoice.component';
import { ListRecordComponent } from './components/list-record/list-record.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { EditRecordComponent } from './components/edit-record/edit-record.component';
import { AdminGuard } from './guard/admin.guard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AppUserLayoutComponent,
    AddDoctorComponent,
    EditDoctorComponent,
    ListDoctorComponent,
    ProfileDoctorComponent,
    ProfilePatientComponent,
    AboutComponent,

    AppAdminLayoutComponent,
    AdminLoginComponent,

    AdminDashboardComponent,
    SpecialtyComponent,
    AddPatientComponent,
    EditPatientComponent,
    ListPatientComponent,
    PageListDoctorComponent,
    DetailDoctorComponent,

    WaitingPtComponent,
    FinishedPtComponent,
    ListMedicalrecordComponent,
    WaitingDtComponent,
    FinishDtComponent,
    MedicalRecordComponent,

    ListAppointmentComponent,
    ListInvoiceComponent,
    ListRecordComponent,
    EditAppointmentComponent,
    EditRecordComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'admin/login', component: AdminLoginComponent,
      },
      {
        path: 'admin',
        component: AppAdminLayoutComponent,
        children: [
          { path: '', component: AdminDashboardComponent, canActivate: [AdminGuard] },

          { path: 'specialty', component: SpecialtyComponent, canActivate: [AdminGuard] }, //test ok

          { path: 'patient', component: ListPatientComponent, canActivate: [AdminGuard] }, // test list ok
          { path: 'patient/edit/:id', component: EditPatientComponent, canActivate: [AdminGuard] }, // test edit ok

          { path: 'doctor', component: ListDoctorComponent, canActivate: [AdminGuard] }, // test list ok
          { path: 'doctor/create', component: AddDoctorComponent, canActivate: [AdminGuard] }, // test create ok
          { path: 'doctor/edit/:id', component: EditDoctorComponent, canActivate: [AdminGuard] }, // test edit ok
          { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },

          { path: 'invoice', component: ListInvoiceComponent, canActivate: [AdminGuard] },// test list ok
          { path: 'appointment', component: ListAppointmentComponent, canActivate: [AdminGuard] },// test list ok
          { path: 'medicalrecord', component: ListRecordComponent, canActivate: [AdminGuard] },// test list ok

          { path: 'appointment/edit/:id', component: EditAppointmentComponent, canActivate: [AdminGuard] }, // test list ok
          { path: 'medicalrecord/edit/:id', component: EditRecordComponent, canActivate: [AdminGuard] }, // test list ok


        ]
      },
      {
        path: '',
        component: AppUserLayoutComponent, //template cha
        children: [ //template con
          { path: '', component: HomeComponent },
          { path: 'about', component: AboutComponent },
          { path: 'login', component: LoginComponent }, // vẫn chưa ổn định

          { path: 'patient/register', component: AddPatientComponent }, // đăng ký bệnh nhân, test ok
          { path: 'doctor', component: PageListDoctorComponent }, // list bác sĩ cho bệnh nhân, test ok
          { path: 'doctor/detail/:id', component: DetailDoctorComponent }, // chi tiết bác sĩ cho bệnh nhân, test ok

          /*, canActivate: [DoctorGuard]*/
          { path: 'profile-doctor', component: ProfileDoctorComponent, canActivate: [DoctorGuard] },
          { path: 'doctor/waiting', component: WaitingDtComponent, canActivate: [DoctorGuard] },
          { path: 'doctor/finish', component: FinishDtComponent, canActivate: [DoctorGuard] },
          { path: 'doctor/medical-record/:id', component: MedicalRecordComponent, canActivate: [DoctorGuard] },

          /*, canActivate: [AuthGuard]*/
          { path: 'patient', component: ProfilePatientComponent, canActivate: [AuthGuard] }, // hồ sơ, test ok
          { path: 'patient/waiting', component: WaitingPtComponent, canActivate: [AuthGuard] }, // test ok
          { path: 'patient/finish', component: FinishedPtComponent, canActivate: [AuthGuard] }, // test ok
          { path: 'patient/list-medicalrecord', component: ListMedicalrecordComponent, canActivate: [AuthGuard] }, // test ok


        ]
      }

    ])
  ],
  // providers: [
  //   // { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  //   // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }, 
  // ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
