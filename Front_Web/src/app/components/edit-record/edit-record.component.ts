import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class EditRecordComponent implements OnInit {
  date_med_exam: any;
  symptom: any;
  diagnostic: any;
  patient_name: any;
  dt_name: any;
  invoice_id: any;
  patient_id: any;
  dt_id: any;
  id: any;
  medicalrecord_id: any;
  listRecord: any = []
  total_money: any;
  constructor(private service: SharedService, private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadDetail()
  }

  editRecord() {
    var val = {
      medicalrecord_id: this.medicalrecord_id,
      date_med_exam: this.date_med_exam,
      symptom:this.symptom,
      diagnostic:this.diagnostic,
      patient_id: this.patient_id,
      dt_id: this.dt_id,
      invoice_id: this.invoice_id,
      total_money:this.total_money,
    }
    this.service.putRecord(val).subscribe(res => {
      alert(res.toString())
    })
    console.log(val)
  }

  loadDetail() {
    this.activateRouter.params.subscribe(params => {
      this.id = params['id']
      this.service.getObjRecord(this.id).subscribe(data => {
        this.listRecord = data;

        this.medicalrecord_id= this.listRecord.medicalrecord_id,
        this.date_med_exam = this.listRecord.date_med_exam;
        this.symptom = this.listRecord.symptom;
        this.diagnostic = this.listRecord.diagnostic;

        this.patient_name = this.listRecord.patient_name;
        this.dt_name = this.listRecord.dt_name;
        this.patient_id = this.listRecord.patient_id;
        this.dt_id = this.listRecord.dt_id;
        this.invoice_id = this.listRecord.invoice_id;
        this.total_money = this.listRecord.total_money;
      })
    })
  }
}
