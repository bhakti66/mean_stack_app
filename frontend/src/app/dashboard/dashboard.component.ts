import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service'
import { Router } from '@angular/router'
import { MatTableDataSource,MatPaginator } from "@angular/material";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  pageUsers = []
  p: Number = 1;
  count: Number = 5;
  displayedColumns: string[]
  allUsers: MatTableDataSource<any>;
  
  constructor(
    private httpService : HttpService,
    private router : Router) {
      this.displayedColumns=['username','email'];
      this.allUsers = new MatTableDataSource();
     }


  ngOnInit() {
    this.httpService.get('user/all').then((result)=>{
      console.log('all users ',result);
      this.allUsers.data = result['user']
      this.allUsers.paginator = this.paginator
    },(err)=>{

    })
  }

  onChangePage(pageUsers: Array<any>) {
    // update current page of items
    this.pageUsers = pageUsers;
}
}
