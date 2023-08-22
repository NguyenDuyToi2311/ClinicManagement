import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css',
    '../../../Content/user/css/maicons.css',
    '../../../Content/user/css/bootstrap.css',
    '../../../Content/user/vendor/animate/animate.css',
    '../../../Content/user/css/theme.css',
    '../../../Content/user/vendor/owl-carousel/css/owl.carousel.css',

  ]
})
export class ListPatientComponent implements OnInit {

  listPatient: any[] = [] // 1 mảng chứa dang sách của model
  selectedPatient: any = [] //đại diện cho 1 phần tử hoặc thao tác trong giao diện

  patient_idFilter: string = ""
  patient_nameFilter: string = ""
  patient_dobFilter: string = ""

  PhotoFileName: string = ""
  PhotoFilePath: string = ""
  showFullAddress: boolean = false;

  constructor(private service: SharedService) { }
  ngOnInit(): void {
    this.refreshPatient()

  }


  moreAddress() {
    this.showFullAddress = !this.showFullAddress;
  }

  collapseAddress() {
    this.showFullAddress = this.showFullAddress;
  }


  refreshPatient() {
    this.service.getPatient().subscribe(data => {
      this.listPatient = data;
      this.selectedPatient = data;
      this.PhotoFilePath = this.service.PhotoURL + this.PhotoFileName;
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


  FilterFn() {
    var patient_idFilter = this.patient_idFilter.toString().trim().toLowerCase()
    var patient_nameFilter = this.patient_nameFilter.toString().trim().toLowerCase()
    var patient_dobFilter = this.patient_dobFilter.toString().trim().toLowerCase()

    this.selectedPatient = this.listPatient.filter(function (el: any) {
      return (
        el.patient_id.toString().toLowerCase().includes(patient_idFilter) &&
        el.patient_name.toString().toLowerCase().includes(patient_nameFilter) &&
        el.date_ob.toString().toLowerCase().includes(patient_dobFilter))
    })
  }

  SortResult(prop: any, asc: any) {
    console.log(this.listPatient);
    this.selectedPatient = this.listPatient.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    })
  }

}
