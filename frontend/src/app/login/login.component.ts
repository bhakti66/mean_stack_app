import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpService } from '../services/http.service'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { User } from '../models/user'
import { Login } from '../user.actions'
import { State } from '../reducers/index'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup

  constructor(private formBuilder:FormBuilder,
              private httpService : HttpService,
              private router : Router,
              private store : Store<State>) {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })

   }

  ngOnInit() {
  }


  login(){
    // this.store.dispatch(new Login(this.loginForm.value))

    this.httpService.post('user/login',this.loginForm.value).then((response)=>{
      if(response['status']==200){
        localStorage.setItem('currentUser',response['user'])
        this.router.navigateByUrl("dashboard")
      }
      else{
        alert("Invalid credentials")
      }
    },(err)=>{

    })
  }
}
