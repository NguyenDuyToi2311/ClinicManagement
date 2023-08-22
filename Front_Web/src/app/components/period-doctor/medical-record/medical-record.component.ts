import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: [
    './medical-record.component.css',
    '../../../Content/user/css/theme.css',
    '../../../Content/user/css/maicons.css',
    '../../../Content/user/css/bootstrap.css',
    '../../../Content/user/vendor/animate/animate.css',
    '../../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class MedicalRecordComponent implements OnInit {
  id: number = 0
  appointment: any;

  apm_id: any;
  patient_id: any;
  dt_id: any;

  patient_name: any;
  dt_name: any;
  symptom: any;
  diagnostic: any;
  total_money: any;
  note: any;

  userDataSubscription: any;
  userData = new User();
  constructor(
    private service: SharedService,
    private authService: AuthService,
    private activateRouter: ActivatedRoute,
    private route: Router,

  ) { }

  ngOnInit(): void {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
    this.loadDetail()
  }
  loadDetail() {
    this.activateRouter.params.subscribe(params => {
      this.id = params['id']
      this.service.retrieveAppointment(params['id']).subscribe(data => {
        this.appointment = data;

        // this.apm_id = this.appointment.apm_id;
        this.dt_id = this.appointment.dt_id;
        this.patient_id = this.appointment.patient_id;

        this.patient_name = this.appointment.patient_name;
        this.dt_name = this.appointment.dt_name;
        this.symptom = this.appointment.symptom;
        this.diagnostic = this.appointment.diagnostic;
        this.note = this.appointment.note;
      })
      console.log(this.appointment)
    })

  }


  makeMedrecord() {
    var val = {
      dt_id: this.dt_id,
      patient_id: this.patient_id,
      symptom: this.symptom,
      diagnostic: this.diagnostic,
      total_money: this.total_money,

    }
    this.service.postMedicalrecord(val).subscribe(res => {
      alert(res.toString())
    })
    this.loadDetail()
    console.log(val)
  }

}
