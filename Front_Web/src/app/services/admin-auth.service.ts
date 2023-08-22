import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  userData = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient, private router: Router) { }

  login(userDetails: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/admin/', userDetails).pipe(map(res => {
      localStorage.setItem('token', res.token);
      this.setUserDetails();
      console.log(localStorage.getItem('token'))
      return res;

    }));

  }

  setUserDetails() {
    if (localStorage.getItem('token') != null) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(window.atob((localStorage.getItem('token') || "").split('.')[1]));
      userDetails.UserName = decodeUserDetails.sub;
      userDetails.FullName = decodeUserDetails.fullName;
      userDetails.IsLoggedIn = true;
      userDetails.Role = decodeUserDetails.role;
      this.userData.next(userDetails);
      // console.log(userDetails)
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['admin/login']);
    this.userData.next(new User());
  }
}
