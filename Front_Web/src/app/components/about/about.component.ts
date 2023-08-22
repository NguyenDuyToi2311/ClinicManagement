import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css']
})
export class AboutComponent implements OnInit {
  listDt: any = []

  dt1: any
  dt2: any
  dt3: any

  PhotoFilePath: any
  constructor(private service: SharedService) { }


  ngOnInit(): void {
    this.loadDetail()
  }
  loadDetail() {
    this.service.getDoctor().subscribe(data => {
      this.listDt = data
      this.dt1 = this.listDt[0]
      this.dt2 = this.listDt[1]
      this.dt3 = this.listDt[2]
    })
    this.PhotoFilePath = this.service.PhotoURL
  }

}
