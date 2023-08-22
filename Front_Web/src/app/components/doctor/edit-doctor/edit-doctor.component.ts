import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css',
    '../../../Content/user/css/maicons.css',
    '../../../Content/user/css/bootstrap.css',
    '../../../Content/user/vendor/animate/animate.css',
    '../../../Content/user/css/theme.css',
    '../../../Content/user/vendor/owl-carousel/css/owl.carousel.css']
})
export class EditDoctorComponent implements OnInit {
  PhotoFilePath: string = ""
  PhotoFileName: string = ""

  id: any
  doctor: any

  dt_id = 0
  dt_name: string = ""
  specialty_id = 0
  specialty_name: string = ""
  email: string = ""
  phone_dt: string = ""
  password: string = ""
  usertype = "Doctor";

  selectedSpecialty: any = []

  specialty: any = [this.specialty_name]
  constructor(private service: SharedService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.loadInforDoctor();
  }

  ngOnInit(): void {

  }

  editDoctor() {
    var val = {
      dt_id: this.dt_id,
      dt_name: this.dt_name,
      specialty_id: this.specialty_id,
      email: this.email,
      phone_dt: this.phone_dt,
      password: this.password,
      usertype: "Doctor",
      image_dt: this.PhotoFileName
    }
    this.service.putDoctor(val).subscribe(data => {
      alert(data.toString())
      console.log(val)
      //this.router.navigate(['admin/doctor'])
    })
  }

  loadInforDoctor() {
    this.activatedRoute.params.subscribe(params => {
      var id = params['id'];
      this.service.getobjDoctor(id).subscribe(data => {
        this.doctor = data;

        this.dt_id = this.doctor.dt_id;
        this.dt_name = this.doctor.dt_name;

        //this.specialty_id = this.doctor.specialty_id;
        this.specialty_id = this.doctor.specialty_id;

        this.email = this.doctor.email;
        this.phone_dt = this.doctor.phone_dt;
        this.password = this.doctor.password;
        this.usertype = "Doctor";

        this.PhotoFileName = this.doctor.image_dt;
        this.PhotoFilePath = this.service.PhotoURL + this.PhotoFileName


        console.log(this.specialty_id)

        this.service.getSpecialty().subscribe(data => {
          this.selectedSpecialty = data


        });
      })
    })
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append("uploadedFile", file, file.name);
    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.PhotoURL + this.PhotoFileName
    })
  }
}

