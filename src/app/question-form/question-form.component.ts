import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { FileUploadService } from '../file-upload.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  contactMethod;
  selectedFile:File=null;
  contactMethods=[
    {id: 1, name: 'Freshers'},
    {id: 2, name: 'Expirence'},
  ];

  constructor(private http: HttpClient) { }

  
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
  selected(){
    console.log(this.contactMethod)}

}
