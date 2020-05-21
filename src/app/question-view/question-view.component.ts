import { Component, OnInit } from '@angular/core';
import { GetData } from '../services/get-data.service';
import { Router } from '@angular/router';
import { Questions } from '../models/questions.model';
import {PageEvent} from "@angular/material";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthGard } from '../services/auth-gard.service';

@Component({
  selector: 'question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {
  panelOpenState = false;
  lowValue: number = 0;
  highValue: number = 20; 
  questionEvent;
 
 isCollapsed:boolean=true;
  public length;

  QuForm = new FormGroup({
    ID: new FormControl(null, [Validators.required]),
    Question: new FormControl('', [Validators.required]),
    Option_A: new FormControl('', [Validators.required]),
    Option_B: new FormControl('', [Validators.required]),
    Option_C: new FormControl(''),   
    Option_D:  new FormControl('', Validators.required),
    Option_E:  new FormControl('', Validators.required),
    Option_F:  new FormControl('', Validators.required),
    Currect_ANS:  new FormControl('', Validators.required),
    Exp:        new FormControl('', Validators.required),
    language: new FormControl('', Validators.required)
   
  });
  
  dd : Questions[] = [];
  constructor(private router: Router,private getdata: GetData,private authService: AuthGard) { }

  ngOnInit() {
    this.authService.afterlogin();
   this.startup();
      
  }

   startup(){
     console.log("startup");
    let email=localStorage.getItem('name');
    
    let da=this.getdata.getquestionData(email)
    .subscribe((res)=>{
        // console.log(res);
        this.dd=res;
       console.log(this.dd.length);
      });  
   }      

    public getPaginatorData(event: PageEvent): PageEvent {
      this.lowValue = event.pageIndex * event.pageSize;
      this.highValue = this.lowValue + event.pageSize;
      return event;
    }
    public editQ(event){
      
      this.isCollapsed=false;
      this.questionEvent=event;
      this.QuForm.controls['ID'].setValue(event.ID);
      this.QuForm.controls['Question'].setValue(event.Question);
      this.QuForm.controls['Option_A'].setValue(event.Option_A);
      this.QuForm.controls['Option_B'].setValue(event.Option_B);
      this.QuForm.controls['Option_C'].setValue(event.Option_C);
      this.QuForm.controls['Option_D'].setValue(event.Option_D);
      this.QuForm.controls['Option_E'].setValue(event.Option_E);
      this.QuForm.controls['Option_F'].setValue(event.Option_F);
      this.QuForm.controls['Currect_ANS'].setValue(event.Answer);
      this.QuForm.controls['language'].setValue(event.language);
      this.QuForm.controls['Exp'].setValue(event.Exp);
      console.log(this.questionEvent);
      
    }
    Cancel(){
      this.isCollapsed=true;
      this.startup();
    }

    Update(){
      console.log(this.QuForm);
      // let da=this.getdata.updateQuestion(this.QuForm.value.ID,this.QuForm.value.Question,this.QuForm.value.Option_A,this.QuForm.value.Option_B,this.QuForm.value.Option_C,this.QuForm.value.Option_D,this.QuForm.value.Option_E,this.QuForm.value.Option_F,this.QuForm.value.Currect_ANS,this.QuForm.value.Exp,this.QuForm.value.language)
      // .subscribe((res)=>{
      //     // console.log(res);
      //     res;
      //    console.log(res);
      //    this.startup();
      //   this.isCollapsed=true;
      //   });  
           
    }

}
