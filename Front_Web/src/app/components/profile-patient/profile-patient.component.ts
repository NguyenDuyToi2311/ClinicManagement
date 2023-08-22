import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-profile-patient',
  templateUrl: './profile-patient.component.html',
  styleUrls: ['./profile-patient.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class ProfilePatientComponent implements OnInit {
  id: number = 0
  userData = new User()

  patient: any;
  patient_id: any;
  patient_name: string = "";
  gender: string = "";
  date_ob: string = "";
  phone_pt: string = "";
  address: string = "";
  // password: string = "";
  usertype = "Patient";
  image_pt: any;

  userDataSubscription: any;
  PhotoFileName: string = "";
  PhotoFilePath: string = "";

  selectedPatient: any = [];
  pending: any = [];

  constructor(
    private service: SharedService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadDetailPaitent()
    console.log(this.loadDetailPaitent())
  }
  loadDetailPaitent() {
    // this.id = this.userData.UserId;
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
    this.id = this.userData.UserId;
    this.service.getobjPatient(this.id).subscribe(data => {
      this.selectedPatient = data;

      this.patient_id = this.selectedPatient.patient_id;
      this.patient_name = this.selectedPatient.patient_name;
      this.gender = this.selectedPatient.gender;
      this.date_ob = this.selectedPatient.date_ob;
      this.phone_pt = this.selectedPatient.phone_pt;
      this.address = this.selectedPatient.address;

      this.PhotoFileName = this.selectedPatient.image_pt
      this.PhotoFilePath = this.service.PhotoURL + this.PhotoFileName

      // console.log("Patient",this.selectedPatient)
    })

    this.service.getPatentPending(this.userData.UserId).subscribe(data => {
      this.pending = data;
      // console.log("Pending",this.pending)
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

