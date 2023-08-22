import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-detail-doctor',
  templateUrl: './detail-doctor.component.html',
  styleUrls: ['./detail-doctor.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class DetailDoctorComponent implements OnInit {

  date_med_exam: string = "";

  dt_id = 0
  dt_name: string = ""
  patient_id: any
  email: string = ""
  phone_dt: string = ""
  note: string = ""
  specialty_id = 0
  password: string = ""

  PhotoFileName: string = ""
  PhotoFilePath: string = ""

  appointmentClicked: boolean = false; // dùng để kiểm tra rỗng
  userDataSubscription: any;
  userData = new User();
  selectedDoctor: any = [];
  doctor: any;
  id: number = 0;

  constructor(
    private service: SharedService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    // console.log(this.loaddoctor())
    // Gán thời gian hiện tại vào biến date_med_exam
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
    const currentDatetime = new Date().toISOString().substring(0, 10); //(0,10) lấy dd-mm-yyyy, (0,16) lấy dd-mm-yyyy hh.mm pp
    this.date_med_exam = currentDatetime;
    this.loadDoctor()
    // console.log(new Date()) === //Wed Aug 09 2023 15:33:56 GMT+0700 (Indochina Time)
    // console.log(new Date().toISOString()) === // 2023-08-09T08:34:19.108Z
    // console.log(new Date().toISOString().substring(0, 10)) === // 2023-08-09

    console.log(this.loadDoctor())

  }
  loadDoctor() {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.service.getobjDoctor(this.id).subscribe(data => {
        this.selectedDoctor = data;

        this.dt_id = this.selectedDoctor.dt_id;
        this.dt_name = this.selectedDoctor.dt_name;
        this.specialty_id = this.selectedDoctor.specialty_id;
        // this.patient_id = this.selectedDoctor.patient_id;
        this.email = this.selectedDoctor.email;
        this.phone_dt = this.selectedDoctor.phone_dt;
        this.note = this.selectedDoctor.note;

        this.PhotoFileName = this.selectedDoctor.image_dt;
        this.PhotoFilePath = this.service.PhotoURL + this.selectedDoctor.image_dt;
      })
    })
  }

  creatAppointment() {
    // this.appointmentClicked = true
    var val = {
      date_med_exam: this.date_med_exam,
      patient_id: this.userData.UserId,
      dt_id: this.dt_id,
      status: "Pending",
      note: this.note,
    }
    if (this.authService.isAuthenticated()) {
      this.service.postAppointment(val).subscribe(res => {
        alert(res.toString())
      })
    } else {
      this.router.navigate(['/login'])
    }

  }
}
