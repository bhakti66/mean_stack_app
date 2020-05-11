import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpService } from '../services/http.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginForm : FormGroup

  constructor(private formBuilder:FormBuilder,
              private httpService : HttpService,
              private router : Router) {
    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })

   }

  ngOnInit() {
  }


  register(){
    this.httpService.post('user/register',this.loginForm.value).then((response)=>{
      if(response['status']==200){
        this.router.navigateByUrl("")
      }
      else{
        alert("User already regsitered")
      }
    },(err)=>{

    })
  }
}
