import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "http://localhost:3000/"
  constructor(private http: HttpService) { }

  login(payload){
    return new Promise((resolve,reject)=>{
      this.http.post('user/login',payload).then((response)=>{
        if(response['success']){
          localStorage.setItem('token',response['token'])
          resolve(true)
        }
        else{
          resolve(false)
        }
      },(err)=>{
        reject(false)
      })
    })
    
  }

  isLoggedIn(){
    //check if user is logged in by checking if the token is available in localstorage. If yes, then check if the token is valid.
    if(localStorage.getItem('token')){
      return true
    }
    return false
  }
}
