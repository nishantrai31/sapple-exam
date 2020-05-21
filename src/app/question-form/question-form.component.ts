import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { FileUploadService } from '../file-upload.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GetData } from '../services/get-data.service';

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  A = false;
  B = false;
  C = false;
  D = false;
  E = false;
  F = false;
  isCollapsed:boolean=true;
  contactMethod;
  dd;
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
    Answer_E:  new FormControl('', Validators.required),
    Answer_F:  new FormControl('', Validators.required),
    Currect_ANS:  new FormControl('', Validators.required),
    contactMethod: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required)
   
  });
  
  
  constructor(private http: HttpClient,private router: Router,private getdata: GetData) { }

  
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
    this.http.post('http://localhost:51065/api/FileUpload',fb)
      .subscribe(res=>{
        console.log(res);
      });
    console.log(fb);
  }
  submit()
  {
    console.log(this.userForm);
    if(this.userForm.status!="INVALID")
    {
       let da=this.getdata.postQuestion(this.userForm.value.Question,this.userForm.value.Answer_A,this.userForm.value.Answer_B,this.userForm.value.Answer_C,this.userForm.value.Answer_D,this.userForm.value.Answer_E,this.userForm.value.Answer_F,this.userForm.value.Currect_ANS,this.userForm.value.contactMethod,this.userForm.value.language)
    .subscribe((res)=>{
        // console.log(res);
        this.dd=res;
       console.log(this.dd);
      });  
      this.userForm.reset();
      this.router.navigate(['/question-form']);
    }
    else{
      console.log("error");
    }
   
  }
  selected(){
    console.log(this.userForm.value.contactMethod);
    
  }
  viewQuestion(){
    this.router.navigate(['/question-view']);
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
    
    changeValue(event){
      console.log(event);
      console.log(this.A);
      console.log(this.userForm.value.Answer_A);
      
       
        this.userForm.controls['Currect_ANS'].setValue(this.userForm.value.Answer_A+","+this.userForm.value.Answer_B+","+this.userForm.value.Answer_C+","+this.userForm.value.Answer_D);
        console.log(this.userForm.value.Currect_ANS);
      
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
   get Answer_E() {
    return this.userForm.get('Answer_E');
 } 
 get Answer_F() {
  return this.userForm.get('Answer_F');
}     
   get Currect_ANS() {
    return this.userForm.get('Currect_ANS');
  }      
  get language() {
    return this.userForm.get('language');
  }      
}
