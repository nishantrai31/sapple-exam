import { Component, OnInit } from '@angular/core';
import { GetData } from '../services/get-data.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'candidate-view',
  templateUrl: './candidate-view.component.html',
  styleUrls: ['./candidate-view.component.css']
})

export class CandidateViewComponent implements OnInit {

  constructor(private getdata: GetData,private router: Router) { }
  Candidate: any;
  ngOnInit() {
  
    this.getdata.Candidate().subscribe(
      (data: any) => {
        this.Candidate = data;
        console.log(this.Candidate);
       
       }
       );
     
  }
  Question(Id: any)
  {
   console.log(Id);
  }

}
