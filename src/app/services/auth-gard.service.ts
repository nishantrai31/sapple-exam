import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGard {

  constructor(private router:Router,) { }

  canActivate(){
    
    let token=localStorage.getItem('name');
    console.log(token);
    if(!token) {
      console.log(token);
      this.router.navigate(['/']);
      return false;
    }
    else{
      console.log("false");
      return true;
    
    }
    
    
    
   
    // if (this.authService.isLoggedIn()) return true;

    
  }
}
