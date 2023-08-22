import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-finished-pt',
  templateUrl: './finished-pt.component.html',
  styleUrls: ['./finished-pt.component.css',
    '../../../Content/user/css/maicons.css',
    '../../../Content/user/css/bootstrap.css',
    '../../../Content/user/vendor/animate/animate.css',
    '../../../Content/user/css/theme.css',
    '../../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class FinishedPtComponent implements OnInit {
  userDataSubscription: any;
  userData = new User();

  id: number = 0
  patient_id: any;
  patient_name: any;
  gender: any;
  date_ob: any;
  phone_pt: any;
  address: any;
  patient: any;
  PhotoFileName: string = "";
  PhotoFilePath: string = "";

  finishmed: any =[]
  constructor(
    private service: SharedService,
    private authService: AuthService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadDetail()
  }
  loadDetail() {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
    this.id = this.userData.UserId

    // this.activateRoute.params.subscribe(params => {
    //   this.id = params['id'];)}
    this.service.getobjPatient(this.id).subscribe(data => {
      this.patient = data;

      this.patient_id = this.patient.patient_id;
      this.patient_name = this.patient.patient_name;
      this.gender = this.patient.gender;
      this.date_ob = this.patient.date_ob;
      this.phone_pt = this.patient.phone_pt;
      this.address = this.patient.address;
      this.PhotoFileName = this.patient.image_pt
      this.PhotoFilePath = this.service.PhotoURL + this.PhotoFileName

    })
    this.service.getPatentFinish(this.userData.UserId).subscribe(data => {
      this.finishmed = data;
      console.log(this.finishmed)
    })
  }

  cancel(val: any) {
    if (confirm("Are you sure ???")) {
      this.service.deleteAppointment(val).subscribe(res => {
        console.log("Delete ", res)
        alert(res.toString())
      });
    }
  }



}
