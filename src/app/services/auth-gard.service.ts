import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGard {
  private loggedIn = new BehaviorSubject<boolean>(false);
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

   
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  login(){
   
      this.loggedIn.next(true);
      this.router.navigate(['/profile']);
    
  }
  logout() {                            // {4}
  this.loggedIn.next(false);
  this.router.navigate(['/']);

  
    
    
    
   
    // if (this.authService.isLoggedIn()) return true;

    
  }
}
