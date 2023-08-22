import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css',
    '../../../Content/user/css/maicons.css',
    '../../../Content/user/css/bootstrap.css',
    '../../../Content/user/vendor/animate/animate.css',
    '../../../Content/user/css/theme.css',
    '../../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class ListDoctorComponent implements OnInit {

  listDoctor: any[] = []
  selectedDoctor: any = []

  dt_idFilter: string = ""
  dt_nameFilter: string = ""
  specialtyFilter: string = ""

  dt_id: string = "";
  dt_name: string = "";
  specialty: string = "";
  constructor(private service: SharedService) {
  }

  ngOnInit(): void {
    this.refreshDoctor()
  }

  refreshDoctor() {
    this.service.getDoctor().subscribe(data => {
      this.selectedDoctor = data;
      this.listDoctor = data

    })
  }

  SortResult(prop: any, asc: any) {
    this.selectedDoctor = this.listDoctor.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    })
  }

  FilterFn() {
    var dt_idFilter = this.dt_idFilter.trim().toLowerCase()
    var dt_nameFilter = this.dt_nameFilter.toString().trim().toLowerCase()

    // var specialtyFilter = this.specialtyFilter

    this.selectedDoctor = this.listDoctor.filter(function (el: any) {
      return (
        el.dt_id.toString().toLowerCase().includes(dt_idFilter) &&
        el.dt_name.toString().toLowerCase().includes(dt_nameFilter)

        // el.specialty.toString().toLowerCase().includes(
        //   specialtyFilter.toString().trim().toLowerCase()
        // )
      )
    })
  }
}
