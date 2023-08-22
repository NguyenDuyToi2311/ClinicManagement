import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser(userData: any):Observable<any> {
    // return this.http.get('').pipe(map(result =>result))
    return this.http.post('',userData)
  }
}
