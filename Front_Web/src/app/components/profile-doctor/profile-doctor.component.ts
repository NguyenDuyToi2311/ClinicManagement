import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile-doctor.component.html',
  styleUrls: ['./profile-doctor.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css']
})
export class ProfileDoctorComponent implements OnInit {
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

  pending: any = []
  constructor(private service: SharedService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadDetail();
    // this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
    //   this.userData = data;
    // });

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

    this.service.getDoctorPending(this.userData.UserId).subscribe(data => {
      this.pending = data
      console.log(this.pending)
    })

  }
  approvedAppointment(item: any) {
    var val = {
      dt_id: this.dt_id,
      patient_id: item.patient_id,
      apm_id: item.apm_id,
      date_med_exam: item.date_med_exam,
      status: "Waiting",
      note: item.note,
      clinic: this.clinic
    };

    this.service.putPartialAppointment(val).subscribe(
      res => {
        alert(res.toString());
      },
      error => {
        console.log(error)
      });

    this.loadDetail();

  }

  delete(val: any) {
    if (confirm("Are you sure ???")) {
      this.service.deleteAppointment(val).subscribe(res => {
        console.log("Delete ", res)
        alert(res.toString())
      });
    }
  }

}
