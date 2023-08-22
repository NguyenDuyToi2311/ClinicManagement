import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-record',
  templateUrl: './list-record.component.html',
  styleUrls: ['./list-record.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class ListRecordComponent implements OnInit {
  selectedRecord: any = []
  listRecord: any[] = []
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.loadDetail()
  }
  loadDetail() {
    this.service.getRecord().subscribe(data => {
      this.selectedRecord = data
    })
  }
  deleteClick(item: any) {
    if (confirm("Are You Sure Delete This Appointment ?")) {
      this.service.deleteRecord(item.apm_id).subscribe(data => {
        alert(data.toString());
        this.loadDetail();
      })
    }
  }



}
