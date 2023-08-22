import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css',]
})
export class ListInvoiceComponent implements OnInit {

  ListInvoice: any = []
  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.loadDetail()
  }
  loadDetail() {
    this.service.getRecord().subscribe(data => {
      this.ListInvoice = data
    })
  }
  deleteClick(item: any) {

  }
}
