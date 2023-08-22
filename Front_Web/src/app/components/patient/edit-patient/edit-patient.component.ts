import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css',
    '../../../Content/user/css/maicons.css',
    '../../../Content/user/css/bootstrap.css',
    '../../../Content/user/vendor/owl-carousel/css/owl.carousel.css',
    '../../../Content/user/vendor/animate/animate.css',
    '../../../Content/user/css/theme.css']
})
export class EditPatientComponent implements OnInit {
  id: any;

  patient: any;
  patient_id: any;
  patient_name: string = "";
  gender: string = "";
  date_ob: string = "";
  phone_pt: string = "";
  address: string = "";
  password: string = "";
  usertype = "Patient";
  PhotoFileName: string = ""
  PhotoFilePath: string = ""

  selectedSpecialty: any = []

  constructor(private service: SharedService, private router: Router, private activatedRoute: ActivatedRoute) {
    // SharedService truyền dẫn cái url API
    // Router điều hướng giữa các trang trong ứng dụng
    // ActivatedRoute truy xuất thông tin về route hiện tại
    this.loadInforPatient();

  }


  ngOnInit(): void {
    this.gender = 'Male'

  }

  loadInforPatient() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.service.getobjPatient(this.id).subscribe(data => {
        this.patient = data;

        this.patient_id = this.patient.patient_id;
        this.patient_name = this.patient.patient_name;
        this.gender = this.patient.gender;
        this.date_ob = this.patient.date_ob;
        this.phone_pt = this.patient.phone_pt;
        this.address = this.patient.address;
        this.password = this.patient.password;
        this.usertype = "Patient";


        this.PhotoFileName = this.patient.image_pt;
        this.PhotoFilePath = this.service.PhotoURL + this.PhotoFileName

        
      })
    })
  }


  edit() {
    var val = {
      patient_id: this.patient_id,
      patient_name: this.patient_name,
      gender: this.gender,
      date_ob: this.date_ob,
      phone_pt: this.phone_pt,
      address: this.address,
      password: this.password,
      usertype: "Patient",
      image_pt: this.PhotoFileName,

    }
    this.service.putPartialPatient(val).subscribe(res => {
      alert(res.toString())
      //console.error(Error)
      this.router.navigate(['/admin/benhnhan'])
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
