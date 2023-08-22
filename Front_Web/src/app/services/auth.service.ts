import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // isAuthenticated() {
  //   throw new Error('Method not implemented.');
  // }

  userData = new BehaviorSubject<User>(new User()) //lưu trữ thông tin người dùng sau khi đăng nhập

  constructor(private http: HttpClient, private router: Router) { }


  isAuthenticated(): boolean {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const token = localStorage.getItem('token'); // Thay 'token' bằng tên của khóa token trong lưu trữ của bạn
    // console.log(localStorage.getItem('token'))
    return !!token; // Chuyển đổi giá trị token thành giá trị boolean
  }


  setUserDetails() {
    if (localStorage.getItem('token') != null) // truy xuất giá trị được lưu trữ 
    {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(window.atob((localStorage.getItem('token') || "").split('.')[1]))
      // giải mã thông tin trong chuỗi JWT
      // window.atob để giải mã Base64, cần giải mã phần thân (payload) của JWT
      // split('.')[1] tách chuỗi JWT thành hai phần quan tâm đến phần thân (payload) sau khi tách
      // ------------------
      userDetails.UserName = decodeUserDetails.sub;
      userDetails.FullName = decodeUserDetails.fullName;
      userDetails.Role = decodeUserDetails.role;
      userDetails.UserId = decodeUserDetails.userid;
      userDetails.IsLoggedIn = true;
      // ------------------ thuộc tính jwt trong django
      this.userData.next(userDetails)

    }
  }
  login(userDetails: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/login/', userDetails).pipe(map(res => {
      localStorage.setItem('token', res.token);
      this.setUserDetails();
      return res
    }
    )
    )
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.userData.next(new User());
  }
}
