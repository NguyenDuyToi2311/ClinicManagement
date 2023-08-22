import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-waiting-pt',
  templateUrl: './waiting-pt.component.html',
  styleUrls: ['./waiting-pt.component.css',
    '../../../Content/user/css/maicons.css',
    '../../../Content/user/css/bootstrap.css',
    '../../../Content/user/vendor/animate/animate.css',
    '../../../Content/user/css/theme.css',
    '../../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class WaitingPtComponent implements OnInit {
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

  waitingmed: any = [];

  constructor(
    private service: SharedService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadDetail()

    // console.log(this.loadDetail())
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
    this.service.getPatentWaiting(this.userData.UserId).subscribe(data => {
      this.waitingmed = data;
      console.log(this.waitingmed)
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



