import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { map, filter } from 'rxjs/operators';
import { Observable,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetData {
  
  constructor(private http: HttpClient) { }

  postSignup(email,pass,dob,username,profile,mobile,read,write,del,update):Observable<any>{
    console.log("postsignUp");
    dob=dob.toString();
    console.log(dob);
    // return this.http.get('http://localhost:51065/api/Values/?email='+email+'&pass='+pass+'dob='+dob+'&username='+username+'&profile='+profile+'&mobile='+mobile)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
      });
      
      let options = {headers:headers};
  
      var body = JSON.stringify({
        "email": email,
        "password": pass,
        "dob": dob,
        "username": username,
        "profile": profile,
        "mobile": mobile,
        "read": read,
        "write": write,
        "delete": del,
        "update":update
      });
  
      console.log(body);
      return this.http.post('http://localhost:51065/api/Values',body,options);

  }
  CandidateSignup(candidateName,candidateEmailId,candidateMobile):Observable<any>{
    console.log("CandidatepostsignUp");
  
    // return this.http.get('http://localhost:51065/api/Values/?email='+email+'&pass='+pass+'dob='+dob+'&username='+username+'&profile='+profile+'&mobile='+mobile)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
      });
      
      let options = {headers:headers};
  
      var body = JSON.stringify([{
        "Name": candidateName,
        "EmailID": candidateEmailId,
        "MobileNo": candidateMobile,       
      }]
);
  
      console.log(body);
      return this.http.post('http://localhost:51065/api/Condidate/?ss=dcd',body,options);

  }

  Template(data,score):Observable<any>{
    console.log("Template");
  
    // return this.http.get('http://localhost:51065/api/Values/?email='+email+'&pass='+pass+'dob='+dob+'&username='+username+'&profile='+profile+'&mobile='+mobile)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
      });
      
      let options = {headers:headers};
      //var myJsonString = JSON.stringify(data);
      var body = JSON.stringify(data);
      console.log(body);
      return this.http.post('http://localhost:51065/api/QuestionTemplate/?score='+score,body,options);
  }

  CandidateAnswer(CandidateID,QID,OptionID):Observable<any>{
    console.log("CandidatepostsignUp");
  
    // return this.http.get('http://localhost:51065/api/Values/?email='+email+'&pass='+pass+'dob='+dob+'&username='+username+'&profile='+profile+'&mobile='+mobile)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
      
      });
      
      let options = {headers:headers};
  
      var body = JSON.stringify([{
        "CandidateID": CandidateID,
        "QID": QID,
        "OptionID": OptionID,      
      }]);
  
      console.log(body);
      return this.http.post('http://localhost:51065/api/Condidate',body,options);

  }

  CandidateScoreStatus(CandidateID):Observable<any>{
    console.log("CandidatepostsignUp");
  
    // return this.http.get('http://localhost:51065/api/Values/?email='+email+'&pass='+pass+'dob='+dob+'&username='+username+'&profile='+profile+'&mobile='+mobile)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
      
      });    
      let options = {headers:headers};
      var body = JSON.stringify([{
        "CandidateID": CandidateID,           
      }]);
  
      console.log(body);
      return this.http.get('http://localhost:51065/api/Condidate/?candidateid='+CandidateID);

  }

  getlogin(email,pass):Observable<any>{ 
    console.log("getData");
    return this.http.get('http://localhost:51065/api/Values/?email='+email+'&pass='+pass)
    
   
  }
  getTamplate():Observable<any>{ 
    console.log("getData");
    return this.http.get('http://localhost:51065/api/QuestionTemplate')
    
   
  }

  getquestionData(tamp):Observable<any>{ 
    console.log(tamp);
    return this.http.get('http://localhost:51065/api/QuestionUploder?Tamplate='+tamp)
    

  }
  CandidateQuestion(email,Tamplate):Observable<any>{ 
     let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'     
      
      });
      
      let options = {headers:headers};
    console.log("getquestionData");
   
    return this.http.post('http://localhost:51065/api/Condidate/CandidateQuestion?emailID='+email+'&Tamplate='+Tamplate+'&ss=ssss',options)  
  }
  postQuestion(Question,Option_A,Option_B,Option_C,Option_D,Option_E,Option_F,Answer,exp,language):Observable<any>{
    console.log("Question");
    
   
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
      });
      
      let options = {headers:headers};
  
      var body = JSON.stringify(
        [  {
          "Question": Question,
          "Option_A": Option_A,
          "Option_B": Option_B,
          "Option_C": Option_C,
          "Option_D": Option_D,
          "Option_E": Option_E,
          "Option_F": Option_F,
          "Answer"  : Answer,
          "Exp"     : exp,  
          "language": language
        }
        ]
      );
  
      console.log(body);
      return this.http.post('http://localhost:51065/api/QuestionUploder',body,options);

  }

  updateQuestion(ID,Question,Option,Answer,Exp,language):Observable<any>{
    console.log(Option);
    const myObjStr = JSON.stringify(Option);
    console.log(myObjStr);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
      });
      
      let options = {headers:headers};
  
      var body = JSON.stringify(
         {
          "QID":       ID,
          "Question": Question,
         "Options":Option,
          "Answer":Answer,
          "Exp"     :Exp,
          "language":language
        }
        
      );
  
      console.log(body);
      return this.http.put('http://localhost:51065/api/QuestionUploder',body,options);

  }

  DeleteTamplate(data):Observable<any>{
    console.log("DeleteTamplate");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
      });      
      let options = {headers:headers};
      var body = JSON.stringify(data);
      console.log(body);
      return this.http.delete('http://localhost:51065/api/QuestionTemplate/DeleteTemplate?Tamplate='+data,options);
  }
  getQuestions(tamplate,type):Observable<any>{
    //var email="nishant.rai@sapple.co.in"
    return this.http.get('http://localhost:51065/api/QuestionUploder/?Tamplate='+tamplate+'&type='+type);
  }
 Candidate():Observable<any>{
    
    return this.http.get('http://localhost:51065/api/Condidate');
  }
  
}
