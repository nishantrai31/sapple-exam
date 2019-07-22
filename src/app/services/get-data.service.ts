import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { map, filter } from 'rxjs/operators';
import { Observable,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetData {
  
  constructor(private http: HttpClient) { }

  postSignup(email,pass,dob,username,profile,mobile):Observable<any>{
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
        "mobile": mobile
      });
  
      console.log(body);
      return this.http.post('http://localhost:51065/api/Values',body,options);

  }
  
  getlogin(email,pass):Observable<any>{ 
    console.log("getData");
    return this.http.get('http://localhost:51065/api/Values/?email='+email+'&pass='+pass)
    
   
  }

  
}
