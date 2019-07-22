import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthGard } from './services/auth-gard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  opened=false;
  typesOfShoes=[
    {class: 'glyphicon glyphicon-home', name: 'Home'},
    {class: 'glyphicon glyphicon-user', name: 'About Us'},
    {class: 'glyphicon glyphicon-cog', name: 'Services'},
    {class: 'glyphicon glyphicon-briefcase', name: 'Portfolio'},
    {class: 'glyphicon glyphicon-earphone', name: 'Contact'},
  ];

   
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthGard,private router: Router) { }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
  }
  onLogout(){
    this.authService.logout(); }
  // private loggedIn = new BehaviorSubject<boolean>(true);
  // login(){
  //   console.log(this.isLoggedIn$ = this.show());

  // }
  
  // show(){
  //   return this.loggedIn.asObservable();
  // }
  onRegistratin(){
    this.router.navigate(['/Registration']);
  }

  onQuestion(){
    this.router.navigate(['/question-form']);
  }

  onHome(){
    this.router.navigate(['/']);
  }
}
