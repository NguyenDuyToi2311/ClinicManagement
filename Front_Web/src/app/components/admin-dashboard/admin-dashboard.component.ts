import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  patient_id: any;
  patient_name: any;
  dt_id: any;
  dt_name: any;
  symptom: any;
  diagnostic: any;
  total_money: any;
  status: any;
  note: any
  clinic: any;
  date_med_exam: any;
  id: number = 0;
  constructor() { }

  ngOnInit(): void {
  }
  editAppoint() {
    var val = {

    }

  }
}
