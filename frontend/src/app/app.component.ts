import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  logout(){
    localStorage.removeItem('currentUser')
  }

  isLoggedIn(){
    if(localStorage.getItem('currentUser')){
      return true
    }
    return false
  }
}
