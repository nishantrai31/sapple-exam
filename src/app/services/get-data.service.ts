import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { map, filter } from 'rxjs/operators';
import { Observable,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetData {
  
  constructor(private http: HttpClient) { }

  getData(email,pass):Observable<any>{ 
    console.log("getData");
    return this.http.get('http://localhost:51065/api/Values/'+email+','+pass)
    
   
  }
}
