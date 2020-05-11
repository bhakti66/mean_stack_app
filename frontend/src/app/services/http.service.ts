import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient : HttpClient) { }
  apiUrl = "http://localhost:3000/"

  get(url){
    return new Promise((resolve,reject)=>{
      this.httpClient.get(this.apiUrl+url).subscribe((response)=>{
        resolve(response);
      })
    })
  }

  post(url,data){
    return new Promise((resolve,reject)=>{
      this.httpClient.post(this.apiUrl+url,data).subscribe((response)=>{
        resolve(response)
      })
    })
  }

  put(){

  }
}
