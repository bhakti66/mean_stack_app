import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FlexLayoutModule, CoreModule } from "@angular/flex-layout";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from './services/http.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';;

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    CoreModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
