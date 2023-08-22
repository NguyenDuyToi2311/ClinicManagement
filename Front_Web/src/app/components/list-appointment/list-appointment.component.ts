import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class ListAppointmentComponent implements OnInit {

  ListAppoint: any = []
  constructor(private service:SharedService) { }

  ngOnInit(): void {
this.loadDetail()
  }

  loadDetail() {
    this.service.getAppoint().subscribe(data => {
      this.ListAppoint = data
    })
  }
  deleteClick(item: any) {
    if(confirm("Are You Sure Delete This Appointment ?")){
      this.service.deleteAppointment(item.apm_id).subscribe(data => {
        alert(data.toString());
        this.loadDetail();
      })
    }
  }

}
