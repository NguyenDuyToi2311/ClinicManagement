import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-page-list-doctor',
  templateUrl: './page-list-doctor.component.html',
  styleUrls: ['./page-list-doctor.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class PageListDoctorComponent implements OnInit {
  PhotoFilePath: string = ""
  PhotoFileName: string = ""
  selectedDoctor: any = [];
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.loadDoctor()
    // console.log(this.loadDoctor())

  }
  loadDoctor() {
    this.service.getDoctor().subscribe(data => {
      this.selectedDoctor = data
      this.PhotoFilePath = this.service.PhotoURL + this.PhotoFileName;
    })

  }
}
