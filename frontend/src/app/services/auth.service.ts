import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { HttpService } from './http.service'

import { HttpClient } from '@angular/common/http';

import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "http://localhost:3000/"
  constructor(private http: HttpClient) { }
  
  logIn(email: string, password: string): Observable<any> {
    console.log('auth service login');
    
    var url = this.apiUrl+"login"
    return this.http.post<User>(url, {email, password});
    // return this.http.post(url,{email:email,password:password});
  }
}
