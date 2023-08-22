import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css'
  ]
})
export class EditAppointmentComponent implements OnInit {

  patient_id: any;
  patient_name: any;
  dt_id: any;
  dt_name: any;
  symptom: any;
  diagnostic: any;
  total_money: any;
  status: string = "";
  note: any
  clinic: any;
  date_med_exam: any;
  id: number = 0;

  appoint: any = []
  apm_id: any;

  constructor(
    private service: SharedService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadDetail()

  }

  editAppoint() {
    var val = {
      apm_id: this.apm_id,
      date_med_exam: this.date_med_exam,
      status: this.status,
      note: this.note,
      clinic: this.clinic,
      dt_id: this.dt_id,
      patient_id: this.patient_id
    }
    this.service.putPartialAppointment(val).subscribe(res => {
      alert(res.toString())
    })
    console.log(val)
  }


  loadDetail() {
    this.activateRouter.params.subscribe(params => {
      this.id = params['id']
      this.service.retrieveAppointment(this.id).subscribe(data => {
        this.appoint = data

        this.apm_id = this.appoint.apm_id
        this.patient_name = this.appoint.patient_name;
        this.dt_name = this.appoint.dt_name;

        this.date_med_exam = this.appoint.date_med_exam;
        this.status = this.appoint.status;
        this.note = this.appoint.note;
        this.clinic = this.appoint.clinic;

        this.dt_id = this.appoint.dt_id;
        this.patient_id = this.appoint.patient_id

      })
      console.log(this.appoint)
    })
  }
}
