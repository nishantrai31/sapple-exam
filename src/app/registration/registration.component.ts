import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { GetData } from '../services/get-data.service';
import { AuthGard } from '../services/auth-gard.service';
import { userValidators} from './user.validators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  dd;
  unamePattern = "^[a-z0-9_-]{8,15}$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  readpermission;
  writepermission;
  deletepermission;
  updatepermission;

 
  
  isValidFormSubmitted = null;
  
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    conpassword: new FormControl(null, [Validators.required,userValidators.passwordMatchValidator]),
    mobileNumber: new FormControl(''),
    email: new FormControl(''),
    dateOfBirth:  new FormControl('', Validators.required),
    profile:  new FormControl('', Validators.required),
    read: new FormControl(false),
    write: new FormControl(false),
    update: new FormControl(false),
    delete: new FormControl(false)
  });
  
 

  constructor(private http: HttpClient,private router: Router,private getdata: GetData,private authService: AuthGard) { }

  SignUp(){
    let da=this.getdata.postSignup(this.email.value,this.password.value,this.dateOfBirth.value,this.username.value,this.profile.value,this.mobileNumber.value,this.read.value,this.write.value,this.delete.value,this.update.value)
    .subscribe((res)=>{
        // console.log(res);
        this.dd=res;
       console.log(this.dd);
      });   
    console.log(this.userForm);
  }
  
  ngOnInit() {
    this.authService.afterlogin();
    let userad=localStorage.getItem('name');
    let passad=localStorage.getItem('pass');
    console.log(passad);
    let dd=localStorage.getItem('token');
    // let da=this.getdata.getlogin(userad,passad)
    // .subscribe((res)=>{
    //   // console.log(res);
    //   this.dd=res;
    //  console.log(this.dd);
     const helper = new JwtHelperService();

    let decodedToken = helper.decodeToken(dd);
    console.log(decodedToken);
    this.readpermission=(decodedToken.Read=="True");
    this.writepermission=(decodedToken.write=="True");
    this.deletepermission=(decodedToken.delete=="True");
    this.updatepermission=(decodedToken.update=="True");
    console.log(this.readpermission);
    
  // });
  
}
  onLogin(){
    this.router.navigate(['/']);
  }

  

  get username() {
    return this.userForm.get('username');
 }
 get password() {
    return this.userForm.get('password');
 }  
 get conpassword() {
  return this.userForm.get('conpassword');
}  
 get mobileNumber() {
    return this.userForm.get('mobileNumber');
 }    
 get email() {
    return this.userForm.get('email');
 }      
 get dateOfBirth() {
  return this.userForm.get('dateOfBirth');
}      
get read() {
  return this.userForm.get('read');
}    
get write() {
  return this.userForm.get('write');
}    
get delete() {
  return this.userForm.get('delete');
}    
get update() {
  return this.userForm.get('update');
}    
get profile() {
  return this.userForm.get('profile');
}    


}
