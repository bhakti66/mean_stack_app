import { Component, OnInit, Injectable, isDevMode } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup

  constructor(private formBuilder:FormBuilder,
              private authService : AuthService,
              private router : Router) {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })

   }

  ngOnInit() {
  }


  login(){
    this.authService.login(this.loginForm.value).then((isValid)=>{
      if(isValid){
        this.router.navigateByUrl("dashboard")
      }
      else{
        alert("Invalid credentials")
      }
    },(err)=>{
      alert("Invalid credentials")
    })
    
  }
}
