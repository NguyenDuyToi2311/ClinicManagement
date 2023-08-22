import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-waiting-dt',
  templateUrl: './waiting-dt.component.html',
  styleUrls: ['./waiting-dt.component.css',
    '../../../Content/user/css/maicons.css',
    '../../../Content/user/css/bootstrap.css',
    '../../../Content/user/vendor/owl-carousel/css/owl.carousel.css',
    '../../../Content/user/vendor/animate/animate.css',
    '../../../Content/user/css/theme.css']
})
export class WaitingDtComponent implements OnInit {

  id: number = 0
  userData = new User()
  userDataSubscription: any;
  PhotoFileName: string = "";
  PhotoFilePath: string = "";

  doctor: any = [];

  dt_id: any;
  dt_name: any;
  specialty_id: any;
  email: any;
  phone_dt: any;
  image_dt: any;
  specialty_name: any;
  clinic: any;

  waiting: any = []
  constructor(private service: SharedService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadDetail()
  }
  loadDetail() {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    })
    this.id = this.userData.UserId

    this.service.getobjDoctor(this.id).subscribe(data => {
      this.doctor = data;

      this.dt_id = this.doctor.dt_id;
      this.dt_name = this.doctor.dt_name;
      this.specialty_name = this.doctor.specialty_name;
      this.specialty_id = this.doctor.specialty_id;
      this.email = this.doctor.email;
      this.phone_dt = this.doctor.phone_dt;

      this.PhotoFileName = this.doctor.image_dt
      this.PhotoFilePath = this.service.PhotoURL + this.doctor.image_dt
    })

    this.service.getDoctorWaiting(this.userData.UserId).subscribe(data => {
      this.waiting = data
      console.log(this.waiting)

    })
  }
  recordAppointment(item: any) {
    if (confirm("Are you sure you examined this patient ?")) {
      var val = {
        apm_id: item.apm_id,
        dt_id: this.dt_id,
        patient_id: item.patient_id,
        date_med_exam: item.date_med_exam,
        status: "Finish",
        note: item.note,
        clinic: this.clinic
      };
      this.service.putPartialAppointment(val).subscribe(
        res => {
          alert(res.toString());
        })

      // this.loadDetail();
      this.router.navigate(['/doctor/medical-record', item.apm_id])
    }
  }



  refuse(val: any) {
    if (confirm("Are you sure ???")) {
      this.service.deleteAppointment(val).subscribe(res => {
        alert("Refuse Success")
      });
    }
    this.loadDetail();
  }
}



