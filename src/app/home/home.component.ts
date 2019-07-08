import { Component, OnInit } from '@angular/core';
import{FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms'
import { UsernameValidators } from './username.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { GetData } from '../services/get-data.service';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  dd;
  form=new FormGroup({
    username: new FormControl('',[
    Validators.required,Validators.minLength(3),UsernameValidators.cannotContainSpace,UsernameValidators.shouldBeUnique]),
    password: new FormControl('',Validators.required)
  });


  constructor( private router: Router, private getdata: GetData) { }

  login(){
    let da=this.getdata.getData(this.username.value,this.password.value)
    .subscribe((res)=>{
      // console.log(res);
      this.dd=res;
     console.log(this.dd);
     console.log(this.dd[0].email);
     
      this.user();
      console.log("lohin su")
    });    
  }
  ngOnInit() {
  }
  user(){
    // console.log(this.username.value);
    if(this.username.value==this.dd[0].email&& this.password.value==this.dd[0].password)
    {
      localStorage.setItem('name',this.username.value);
      localStorage.setItem('pass',this.password.value);
      // console.log("login");
      this.router.navigate(['/question-form']);
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

}
