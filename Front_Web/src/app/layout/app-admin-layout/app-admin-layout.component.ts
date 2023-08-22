import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/Models/role';
import { User } from 'src/app/Models/user';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-app-admin-layout',
  templateUrl: './app-admin-layout.component.html',
  styleUrls: ['./app-admin-layout.component.css',
    '../../Content/admin/css/bootstrap.min.css',
    '../../Content/admin/css/style.css',
    '../../Content/admin/css/font-awesome.min.css']
})
export class AppAdminLayoutComponent implements OnInit {
  isExpanded = false;
  userDataSubscription: any;
  userData = new User();
  userRole = UserRole;
  constructor(private authService: AdminAuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    })
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
