import { Component, OnInit } from '@angular/core';
import { AuthGard } from '../services/auth-gard.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { GetData } from '../services/get-data.service';

@Component({
  selector: 'editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  dd;
  decodedToken;
  username;
  mobile;
  post;
  email;
  dateofbirth;
  password;

  selectedFile:File=null;
  selectedFile1:File=null;
  imageURL ;
  imageURL1 ;
  constructor(private authService: AuthGard,private router: Router,private http: HttpClient,private sanitizer: DomSanitizer,private getdata: GetData) { }

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
   this.password=decodedToken.password;
   this.imageURL1=decodedToken.profilePIC;
   this.imageURL=decodedToken.timeline;
   
  }

  profile()
  {
    this.router.navigate(['/profile']);
  }

  onSelectedFile(event){
    // console.log(event.target.files[0]);
    this.selectedFile=event.target.files[0];

    var reader = new FileReader();
    reader.onload=(event:any)=>{
      this.imageURL=event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);

    
  }

  onSelectedFile1(event){
    console.log(event.target.files[0]);
     this.selectedFile1=event.target.files[0];

    var reader = new FileReader();
    reader.onload=(event:any)=>{
      this.imageURL1=event.target.result;
    }
    reader.readAsDataURL(this.selectedFile1);
  }

  Save()
  {
    const formData = new FormData();
    formData.append('file2', this.selectedFile);
    formData.append('file1', this.selectedFile1);
    formData.append('email',this.email);
    formData.append('mobile',this.mobile);
    formData.append('password',this.password);
    formData.append('post',this.post);
    formData.append('dob', this.dateofbirth);
    formData.append('username', this.username);
    this.http.post('http://localhost:51065/api/profilimage', formData, {
      reportProgress: true,
      observe: 'events'   
  })
  .subscribe(events => {
      if(events.type == HttpEventType.UploadProgress) {
          console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
      } else if(events.type === HttpEventType.Response) {
        this.refreshToken();
          console.log("success");
      }
      
  })
  }
  refreshToken(){
    console.log(this.username+this.password);
    let da=this.getdata.getlogin(this.email,this.password)
        .subscribe((res)=>{
          // console.log(res);
          this.dd=res;
          console.log(this.dd);
         const helper = new JwtHelperService();
    
        this.decodedToken = helper.decodeToken(this.dd);
        localStorage.removeItem('pass');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.setItem('pass',this.decodedToken.password);
        localStorage.setItem('username',this.decodedToken.username)
        localStorage.setItem('token',this.dd);
        console.log(this.decodedToken);
          
         
        });    
  }
}
