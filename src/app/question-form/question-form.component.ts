import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { FileUploadService } from '../file-upload.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  isCollapsed:boolean=true;
  contactMethod;
  selectedFile:File=null;
  contactMethods=[
    {id: 1, name: 'Freshers'},
    {id: 2, name: 'Expirence'},
  ];

  userForm = new FormGroup({
    Question: new FormControl('', [Validators.required]),
    Answer_A: new FormControl('', [Validators.required]),
    Answer_B: new FormControl('', [Validators.required]),
    Answer_C: new FormControl(''),   
    Answer_D:  new FormControl('', Validators.required),
    Currect_ANS:  new FormControl('', Validators.required),
    contactMethod: new FormControl('', Validators.required)
   
  });
  
  constructor(private http: HttpClient,private router: Router) { }

  
  ngOnInit() {

    
  }

  onSelectedFile(event){
    console.log(event.target.files[0]);
    this.selectedFile=event.target.files[0];
  }

  onSubmit(){
    const fb=new FormData();
    fb.append('xlsx',this.selectedFile,this.selectedFile.name);
    fb.append('profile',this.contactMethod)
    this.http.post('',fb)
      .subscribe(res=>{
        console.log(res);
      });
    console.log(fb);
  }
  submit()
  {
    console.log(this.userForm);
  }
  selected(){
    console.log(this.userForm.value.contactMethod);
  }
    
    onLogout(){
      localStorage.removeItem('name');
      localStorage.removeItem('pass');
      // console.log("login");
      this.router.navigate(['/']);
    }

    xls()
    {
      this.isCollapsed=true;
    }
    manu()
    {
      this.isCollapsed=false;
    }

    get Question() {
      return this.userForm.get('Quetion');
   }
   get Answer_A() {
      return this.userForm.get('Answer_A');
   }  
   get Answer_B() {
    return this.userForm.get('Answer_B');
  }  
   get Answer_C() {
      return this.userForm.get('Answer_C');
   }    
   get Answer_D() {
      return this.userForm.get('Answer_D');
   }      
   get Currect_ANS() {
    return this.userForm.get('Currect_ANS');
  }      
  
}
