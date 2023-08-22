import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css',
    '../../../Content/user/css/maicons.css',
    '../../../Content/user/css/bootstrap.css',
    '../../../Content/user/vendor/animate/animate.css',
    '../../../Content/user/css/theme.css',
    '../../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class AddDoctorComponent implements OnInit {
  PhotoFilePath: string = ""
  PhotoFileName: string = ""

  dt_name: string = ""
  specialty_id = 0
  email: string = ""
  phone_dt: string = ""
  password: string = ""
  usertype = "Doctor";

  selectedSpecialty: any = []

  constructor(private service: SharedService) {
    this.service.getSpecialty().subscribe(data => {
      this.selectedSpecialty = data;
    })
  }

  ngOnInit(): void {
    // this.refreshDoctor()
  }
  // refreshDoctor() {
  //   this.service.getSpecialty().subscribe(data => {
  //     this.listSpecialty = data;
      
  //   })
  // }
  
  createDoctor() {
    var val = {
      dt_name: this.dt_name,
      specialty_id: this.specialty_id,
      phone_dt: this.phone_dt,
      email: this.email,
      password: this.password,
      usertype: "Doctor",
      image_dt: this.PhotoFileName,
    }
    console.log(val)
    this.service.postDoctor(val).subscribe(res => {
      alert(res.toString())
      //console.log(val)
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
