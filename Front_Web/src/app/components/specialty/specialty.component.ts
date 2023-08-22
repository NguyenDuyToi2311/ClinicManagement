import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css'
  ]
})


export class SpecialtyComponent implements OnInit {

  listSpecialty: any[] = []; // 1 mảng chứa dang sách model
  selectedSpecialty: any = [] //đại diện cho 1 phần tử hoặc thao tác trong giao diện

  specialty_idFilter: string = ""
  specialty_nameFilter: string = ""
  totalSpecialty = 0
  constructor(private service: SharedService) {
  }
  ngOnInit(): void {
    this.refreshListSpecialty();
  }

  total() {
    this.selectedSpecialty.specialty_name = "Total Specialty is " + this.listSpecialty.length
  }
  refreshListSpecialty() {
    this.service.getSpecialty().subscribe(data => {
      this.listSpecialty = data;
      this.selectedSpecialty = data;
    })
  }
  Clear() {
    this.selectedSpecialty.specialty_name = "";
    this.refreshListSpecialty()
  }

  CreateOrUpdateSpecialty(form: any) {
    form.value.specialty_id = this.selectedSpecialty.specialty_id;
    form.value.specialty_name = this.selectedSpecialty.specialty_name;

    if (this.selectedSpecialty && this.selectedSpecialty.id) { //update
      this.service.putSpecialty(form.value).subscribe(data => {
        alert(data.toString())
        this.refreshListSpecialty()
      })
    }
    else {
      this.service.postSpecialty(form.value).subscribe(data => { //Create
        alert(data.toString())
        this.refreshListSpecialty()
      })
    }

  }

  selectSpecialty(item: any) {
    this.selectedSpecialty = item;
  }

  deleteSpecialty(item: any) { // Đã kt == ok
    //if (this.selectedSpecialty && this.selectedSpecialty.specialty_id) {
    if (confirm("Are you sure ???")) {
      this.service.deleteSpecialty(item).subscribe(data => {
        console.log("Delete ", data)
        this.service.getSpecialty().subscribe(data => {
          this.listSpecialty = data;
        });
      })
    }
  }




  FilterFn() {
    var specialty_idFilter = this.specialty_idFilter
    var specialty_nameFilter = this.specialty_nameFilter
    this.selectedSpecialty = this.listSpecialty.filter(function (el: any) {
      return el.specialty_id.toString().toLowerCase().includes(
        specialty_idFilter.toString().trim().toLowerCase()
      ) &&
        el.specialty_name.toString().toLowerCase().includes(
          specialty_nameFilter.toString().trim().toLowerCase()
        )
    })
  }

  SortResult(prop: any, asc: any) {
    console.log(this.listSpecialty);
    this.selectedSpecialty = this.listSpecialty.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    })
  }

}





