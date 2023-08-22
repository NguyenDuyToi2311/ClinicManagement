import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/Models/role';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-app-user-layout',
  templateUrl: './app-user-layout.component.html',
  styleUrls: ['./app-user-layout.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css']
})
export class AppUserLayoutComponent implements OnInit {
  userData = new User()
  userRole = UserRole
  isExpanded = false;
  userDataSubscription: any;
  constructor(private authService: AuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data
    })
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.logout();
  }
  ngOnInit(): void {
  }

}


