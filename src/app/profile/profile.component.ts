import { Component, OnInit } from '@angular/core';
import { AuthGard } from '../services/auth-gard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';



@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username;
  mobile;
  post;
  email;
  dateofbirth;

  profilePIC ;
  timeline;
  constructor(private authService: AuthGard,private router: Router) { }

  ngOnInit() {

    console.log("profile load");

    this.authService.afterlogin();
    let userad=localStorage.getItem('name');
    this.username=localStorage.getItem('username');
    console.log(this.username);
    let dd=localStorage.getItem('token');
    // let da=this.getdata.getlogin(userad,passad)
    // .subscribe((res)=>{
    //   // console.log(res);
    //   this.dd=res;
    //  console.log(this.dd);
     const helper = new JwtHelperService();

    let decodedToken = helper.decodeToken(dd);
    console.log(decodedToken);
   this.mobile=decodedToken.mobile;
   this.dateofbirth=decodedToken.dateofbirth;
   this.email=userad;
   this.post=decodedToken.profile;
   this.profilePIC=decodedToken.profilePIC;
   this.timeline=decodedToken.timeline;
   console.log(decodedToken.profilePIC);
   
   
    
  }

  editprofile(){
    this.router.navigate(['/editprofile']);
  }

}
