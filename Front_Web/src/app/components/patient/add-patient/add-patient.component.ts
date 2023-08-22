import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css',
    '../../../Content/user/css/maicons.css',
    '../../../Content/user/css/bootstrap.css',
    '../../../Content/user/vendor/animate/animate.css',
    '../../../Content/user/css/theme.css',
    '../../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class AddPatientComponent implements OnInit {


  listpatient: any[] = []
  selectedpatient: any = []

  // patientdata
  patient_name: string = "";
  gender: string = "";
  date_ob: string = "";
  phone_pt: string = "";
  address: string = "";
  password: string = "";
  usertype = "Patient";
  //image_pt: string = "";

  PhotoFileName: string = ""
  PhotoFilePath: string = ""
  constructor(private service: SharedService) { 
    this.gender = "Male"
  }

  ngOnInit(): void {
    
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

  postPatient() {
    var val = {
      patient_name: this.patient_name,
      gender: this.gender,
      date_ob: this.date_ob,
      phone_pt: this.phone_pt,
      address: this.address,
      password: this.password,
      usertype: this.usertype,
      image_pt: this.PhotoFileName,

    }
    this.service.postPatient(val).subscribe(res => {
      alert(res.toString())
    })
  }
}

/* export class AddPatientComponent implements OnInit {
  patient_name: string = "";
  gender: string = "Other";
  date_ob: string = "";
  phone_pt: string = "";
  address: string = "";
  password: string = "";
  usertype = "Patient";

  // Biến tạm thời để lưu ảnh tải lên
  temporaryPhoto: File | null = null;

  constructor(private service: SharedService) { }

  ngOnInit(): void {}

  // Hàm được gọi khi người dùng chọn ảnh
  uploadPhoto(event: any) {
    this.temporaryPhoto = event.target.files[0];
  }

  // Hàm được gọi khi người dùng thực hiện chức năng "Create"
  addPatient() {
    let val: any = {
      patient_name: this.patient_name,
      gender: this.gender,
      date_ob: this.date_ob,
      phone_pt: this.phone_pt,
      address: this.address,
      password: this.password,
      usertype: this.usertype,
    };

    // Nếu có ảnh tạm thời, tải lên ảnh và gửi tên tệp ảnh trong API request
    if (this.temporaryPhoto) {
      const formData: FormData = new FormData();
      formData.append("uploadedFile", this.temporaryPhoto, this.temporaryPhoto.name);

      this.service.UploadPhoto(formData).subscribe((data: any) => {
        val.image_pt = data.toString(); // Gán tên tệp ảnh vào biến val
        this.savePatient(val); // Gọi hàm lưu thông tin bệnh nhân
      });
    } else {
      this.savePatient(val); // Gọi hàm lưu thông tin bệnh nhân mà không gửi tên tệp ảnh
    }
  }

  // Hàm để gửi thông tin bệnh nhân đến API và lưu vào cơ sở dữ liệu
  savePatient(data: any) {
    this.service.postPatient(data).subscribe((res) => {
      alert(res.toString());
    });
  }
}*/