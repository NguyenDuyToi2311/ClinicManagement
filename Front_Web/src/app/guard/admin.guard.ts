import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../Models/user';
import { UserRole } from '../Models/role';
import { AdminAuthService } from '../services/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  userData = new User()
  userDataSubscription: any
  constructor(private router: Router, private authService: AdminAuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data
    })
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (localStorage.getItem('token') != null && this.userData.Role == UserRole.Admin) {
      return true;
    }

    this.router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
