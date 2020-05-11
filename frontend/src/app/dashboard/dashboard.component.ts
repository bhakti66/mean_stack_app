import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allUsers = []
  pageUsers = []
  p: Number = 1;
  count: Number = 5;
  constructor(
    private httpService : HttpService,
    private router : Router) { }


  ngOnInit() {
    this.httpService.get('user/all').then((result)=>{
      console.log('all users ',result);
      this.allUsers = result['user']
      
    },(err)=>{

    })
  }

  onChangePage(pageUsers: Array<any>) {
    // update current page of items
    this.pageUsers = pageUsers;
}
}
