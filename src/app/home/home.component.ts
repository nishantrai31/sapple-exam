import { Component, OnInit } from '@angular/core';
import{FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms'
import { UsernameValidators } from './username.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { GetData } from '../services/get-data.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGard } from '../services/auth-gard.service';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  dd;
  decodedToken;
  form=new FormGroup({
    username: new FormControl('',[
    Validators.required,Validators.minLength(3),UsernameValidators.cannotContainSpace,UsernameValidators.shouldBeUnique]),
    password: new FormControl('',Validators.required)
  });


  constructor( private router: Router, private getdata: GetData, private authService: AuthGard) { }

  login(){
    let token=localStorage.getItem('name');
    if(token==''){
    let da=this.getdata.getlogin(this.username.value,this.password.value)
    .subscribe((res)=>{
      // console.log(res);
      this.dd=res;
     console.log(this.dd);
     const helper = new JwtHelperService();

    this.decodedToken = helper.decodeToken(this.dd);
    console.log(this.decodedToken.unique_name);
    
    //  console.log(this.dd[0].email);
     
      this.user();
      console.log("lohin su")
    });    
  }
  else{
    this.authService.login();
  }
  }
  ngOnInit() {
  }
  user(){
    // console.log(this.username.value);
    // if(this.username.value==this.dd[0].email&& this.password.value==this.dd[0].password)
    // {
    //   localStorage.setItem('name',this.username.value);
    //   localStorage.setItem('pass',this.password.value);
    //   // console.log("login");
    //   this.router.navigate(['/question-form']);
    // }
    if(this.decodedToken.unique_name=="true")
    {
      localStorage.setItem('name',this.username.value);
      localStorage.setItem('pass',this.password.value);
      // console.log("login");
      this.authService.login();
      // this.router.navigate(['/question-form']);
    }
    else{
      this.form.setErrors({
        invalidLogin: true
  
      });
    }
   
  }
  get username(){
    
    return this.form.get('username');

}

get password(){
  return this.form.get('password');
}

onRegistratin(){
  this.router.navigate(['/Registration']);
}

}
