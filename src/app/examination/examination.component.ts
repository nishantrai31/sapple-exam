import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetData } from '../services/get-data.service';
import { Router , ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import * as $ from "jquery";
import { PropertyBindingType } from '@angular/compiler';
import { fromEventPattern } from 'rxjs';



@Component({
  selector: 'examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})

export class ExaminationComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
     public beforeunloadHandler($event) {
     $event.returnValue = "Are you sure?";
    }

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
      if (event.key === "Escape") {
        console.log("escap");
        this.hideButton = false;
      }
  }

  readonly rootUrl = 'http://localhost:51065';
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  C: string;
  correctAnswerCount: number = 0;
  QuestionNumber:number=0;
scorestatus: boolean=false;
status: string;
  isCheck:boolean=false;
  isRadio:boolean=false;
  radioSelected1:string;
  radioSelected:number=null;
  pageLeave: number=0;
  UserAnswer: Array<{CandidateID: Number,QuestionID: number, OptionID: number}> = []; 
  CandidateSign:boolean=false;

hideButton:boolean;
SubmitButton:boolean;
candidateForm:boolean;

candidateID;
CandidateForm = new FormGroup({
  candidateName: new FormControl('', [Validators.required]),
  candidateMobile: new FormControl(''),
  candidateEmailId: new FormControl(''),
  
});
  constructor(private http: HttpClient, private getData:GetData, private router:Router,private getdata: GetData,private route: ActivatedRoute) { }

  ngOnInit() {
    let param1 = this.route.snapshot.queryParams["Tamplate"];
    console.log(param1);
    let page=0;
  document.addEventListener("visibilitychange", function() {
    if (document.hidden){
        
    } else {
      page++;
      
        alert("Don't leave this page otherwise your your form submited automatic")
        
    }
    
});
  
if(page>0)
      {
        this.submitScore(true);
      }
    
  

/* if (parseInt(localStorage.getItem('seconds')) > 0) {
  this.seconds = parseInt(localStorage.getItem('seconds'));
  this.qnProgress = parseInt(localStorage.getItem('qnProgress'));
  this.qns = JSON.parse(localStorage.getItem('qns'));
  if (this.qnProgress == 10)
    this.router.navigate(['/result']);
  else
    this.startTimer();
} */
// else {
  this.seconds = 3600;
  this.qnProgress = 0;
  this.getQuestions(param1).subscribe(
    (data: any) => {
      this.qns = data;
      console.log(this.qns);
      
      if(this.qns[this.QuestionNumber].Qtype=="radio")
      {
        console.log(this.qns[this.QuestionNumber].Qtype);
        this.isRadio=true;
        this.isCheck=false;
      }
      if(this.qns[this.QuestionNumber].Qtype=="check")
      {
        this.isCheck=true;
        this.isRadio=false;
      }
      
      this.startTimer();
     }
     );
// }
   }
   
   openFullscreen() {
     this.hideButton = true;
    var elem = document.documentElement;
     if (elem.requestFullscreen) {
       elem.requestFullscreen();
     }
   }

   startTimer() {
    this.timer = setInterval(() => {
      this.seconds--;
      localStorage.setItem('seconds', this.seconds.toString());
      if(this.timer==0)
      {
        this.pauseTimeLine();
      }
    }, 1000);
  }

  pauseTimeLine() {
    clearInterval(this.timer);
    this.submitScore(true)
}
  Answer(qID, choice) {
    this.qns[this.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.qns));
    this.qnProgress++;
    localStorage.setItem('qnProgress', this.qnProgress.toString());
    if (this.qnProgress == 10) {
      clearInterval(this.timer);
      this.router.navigate(['/result']);
    }
  }

   displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }
  getQuestions(tamplate) {
    //var email="nishant.rai@sapple.co.in"
    return this.http.get('http://localhost:51065/api/QuestionUploder/?Tamplate='+tamplate+'&type=0');
  }

  getAnswers() {
    var body = this.qns.map(x => x.QnID);
    return this.http.post(this.rootUrl + '/api/Answers', body);
  }

  submitScore(status: boolean) {
    //console.log(this.candidateName.value);
    
    this.CandidateSign=true;
    for(var i=0; i<this.UserAnswer.length;i++)
    {
      let da=this.getdata.CandidateAnswer(this.UserAnswer[i].CandidateID,this.UserAnswer[i].QuestionID,this.UserAnswer[i].OptionID)
      .subscribe((res)=>{
          // console.log(res);
          var dd=res;
         console.log(dd);
        }); 
    }
    if(status==true)
    {
      this.scorestatus=true;
    
      let da=this.getdata.CandidateScoreStatus( this.candidateID)
      .subscribe((res)=>{
          // console.log(res);
          
          if(res==1)
          {
            this.status = "Congrats you are pass Please wait for next round";
          }
          else{
          this.status="Sorry "
          }
         console.log(this.status);
        }); 
    }
       
      this.UserAnswer.splice(0,this.UserAnswer.length);
      console.log(this.UserAnswer);
  }

  NextQn(){
    console.log(this.qns.length,this.QuestionNumber);
if(this.radioSelected!=null && this.radioSelected!=0)
      if(this.UserAnswer.find(e => e.QuestionID ===this.qns[this.QuestionNumber].QID))
      {
        console.log("find");
        
          var ind=this.UserAnswer.findIndex(e => e.QuestionID ===this.qns[this.QuestionNumber].QID);
          console.log("find unchecked");
          console.log(ind);        
          this.UserAnswer.splice(ind,1);
          this.UserAnswer.push({ CandidateID: this.candidateID,QuestionID: this.qns[this.QuestionNumber].QID, OptionID: this.radioSelected });       
      }
      else
      {
        console.log("not find");
        
        this.UserAnswer.push({ CandidateID: this.candidateID,QuestionID: this.qns[this.QuestionNumber].QID, OptionID: this.radioSelected });
      }
    console.log(this.radioSelected);
    this.submitScore(false) 
    this.radioSelected=null
    if(this.QuestionNumber<this.qns.length-1)
    {
      this.QuestionNumber++;
    }
  }

  PreviousQn(){
    console.log(this.qns.length,this.QuestionNumber);
    
    if(this.QuestionNumber>0)
    {
      this.QuestionNumber--;
    }


      
   

  }
 
  OnChange($event, op){ 
    
    console.log($event.checked);
    console.log(op);
    if($event.checked==true)
    {
      var filter=this.UserAnswer.filter(e => e.QuestionID ===this.qns[this.QuestionNumber].QID);
      console.log(filter);
        if(filter.find(e => e.OptionID ===op))
        {
          console.log("find");
        }
        else
        {
          console.log("not find");
          
          this.UserAnswer.push({ CandidateID: this.candidateID,QuestionID: this.qns[this.QuestionNumber].QID, OptionID: op, });
        }
      // if(filter.length==0)
      // {
      //   this.UserAnswer.push({ Quetion: this.QuestionNumber, Answer: $event.source.value });
      // }
    
     
      console.log(this.UserAnswer);
      
    }
    else{
      var filter=this.UserAnswer.filter(e => e.QuestionID ===this.qns[this.QuestionNumber].QID);
      console.log(filter);
        if(filter.find(e => e.OptionID ===op))
        {
          var ind=filter.findIndex(e => e.OptionID ===op);
          console.log("find unchecked");
          console.log(ind);        
          this.UserAnswer.splice(ind,1);

        }
    
      console.log(this.UserAnswer);
    }
        
    //$event.source.toggle();
    //MatCheckboxChange {checked,MatCheckbox}

    
   }
   CandidateSignUp()
    {
      console.log(this.CandidateForm.value.candidateName);
      this.CandidateSign=true;
       let da=this.getdata.CandidateSignup(this.CandidateForm.value.candidateName,this.CandidateForm.value.candidateEmailId,this.CandidateForm.value.candidateMobile)
       .subscribe((res)=>{
           // console.log(res);
           var dd=res;
          console.log(dd);
          this.candidateID=dd[0].CandidateID
         });   
      
    }

  get candidateName() {
      return this.CandidateForm.get('candidateName');
   }
   get candidateMobile() {
      return this.CandidateForm.get('candidateMobile');
   }  
   get candidateEmailId() {
    return this.CandidateForm.get('candidateEmailId');
  }  
  
}
