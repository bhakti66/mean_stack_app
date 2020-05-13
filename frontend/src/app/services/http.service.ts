import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs'
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor {

  constructor(private httpClient: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    let cloneReq = req
    //checking if the url requires token or not. Just 1 url hence have compared like this.
    
    if(req.url.indexOf("/user/all")>=0){    
      cloneReq= req.clone({
        headers: req.headers.set(
          "token",
          localStorage.getItem('token')
        )
      });
    }
    
    return next.handle(cloneReq)
      .pipe(
        map(response => {
          if (response instanceof HttpResponse) {
            console.log('req ',req)
            return response
          }
        })
      );

  }

  apiUrl = "http://localhost:3000/"

  get(url) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.apiUrl + url).subscribe((response) => {
        resolve(response);
      })
    })
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.apiUrl + url, data).subscribe((response) => {
        console.log('res in post ',response)
        resolve(response)
      })
    })
  }

  put() {

  }
}
