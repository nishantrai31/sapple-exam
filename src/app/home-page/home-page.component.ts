import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthGard } from '../services/auth-gard.service';
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  login: Observable<boolean>;
  constructor(private authService: AuthGard) { }

  ngOnInit() {
    this.login = this.authService.isLoggedIn;
    console.log(this.login);
  }

}
