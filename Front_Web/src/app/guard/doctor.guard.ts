import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { UserRole } from '../Models/role';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {
  userData = new User()
  userDataSubscription: any

  constructor(private router: Router, private authService: AuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userData.Role == UserRole.Doctor) { //cho phép user đăng nhập vào
      return true
    }
    if (localStorage.getItem('token') != null) {
      //chứa thông tin xác thực chuyển hướng người dùng đến TRANG KHÁC và kèm theo tham số returnUrl để sau khi đăng nhập
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
  

