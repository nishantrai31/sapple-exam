import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { GetData } from '../services/get-data.service';
import { Validators, FormControl } from '@angular/forms';
import { Router , ActivatedRoute, Params} from '@angular/router';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { ThrowStmt } from '@angular/compiler';

export interface PeriodicElement {
  Question: string;
  position:number;
  QuestionID: number;
  language:string;
  Level:string
}

@Component({
  selector: 'question-template',
  templateUrl: './question-template.component.html',
  styleUrls: ['./question-template.component.css']
})
export class QuestionTemplateComponent implements OnInit {
  selected:string =null;
  update: boolean=false;
  qu:any[];
  ELEMENT_DATA: PeriodicElement[]=[];
  Language: Array<{language:string}> = []; 
  apidata: Array<{TemplateName:string,QID:number}>=[];
  languageselected:string;
  dataSource;
  filterData;
  showMsg:Boolean=false;
  UpdateTamplate: string;
  TempleteName=new FormControl('', [
    Validators.required,
]);
score=new FormControl('', [
  Validators.required,
]);
  mode: ProgressSpinnerMode = 'determinate';
  loader:boolean=false;
  constructor(private getdata: GetData,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.loader=true;
    let param1 = this.route.snapshot.queryParams["Tamplate"];
    console.log(param1);
    if(param1!=null)
    {
      this.update=true;
      this.UpdateTamplate=param1;
    }
    let da=this.getdata.getquestionData(param1)
    .subscribe((res)=>{
        // console.log(res);
        this.qu=res.upload;
        this.score.setValue(res.score);
       console.log(this.qu);
       console.log(this.score);
       var ii=1
       for(var i=0;i<this.qu.length;i++)
       {     
        this.ELEMENT_DATA.push({ position: ii, QuestionID: this.qu[i].QID, Question: this.qu[i].Question,language: this.qu[i].language,Level: this.qu[i].Exp});
        if(!this.Language.find(e => e.language ===this.qu[i].language))
        {
           this.Language.push({language: this.qu[i].language});           
        }
        //this.ELEMENT_DATA[ii].Question=this.qu[i].Question;
        ii++
       }
       console.log(this.Language);
       
       console.log(this.ELEMENT_DATA);
       this.filterData=this.ELEMENT_DATA;
       this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
       this.loader=false;
      },err=>{
        alert(err);
      });  
   }   
   



 
  
  displayedColumns: string[] = ['select', 'QuestionID', 'Question'];
 
  selection = new SelectionModel<PeriodicElement>(true, []);
  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {

    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    console.log("masterToggle");
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    //console.log("checkboxLabel");
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  SelectedLanguage()
  {
    this.filterData=this.ELEMENT_DATA;
    console.log(this.languageselected);
    if(this.languageselected!="all")
    {
    
      var data=this.filterData.filter(e => e.language ===this.languageselected);
      if(data.length>0)
      {
        this.filterData=data;
      }
      if(this.selected!=null)
      {
        data=this.filterData.filter(e => e.Level ===this.selected);
        if(data.length>0)
        {
          this.filterData=data;
        }
      }
     
      console.log(data);
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    }
    if(this.languageselected=="all")
    {
      if(this.selected!=null)
      {
        var data=this.filterData.filter(e => e.Level ===this.selected);
       
        this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      }
    }
    if(this.languageselected=="all"&&this.selected=="all")
    {
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    }
     
  }
  Selectedlevel()
  {
    console.log(this.selected);
    if(this.selected!="all")
    {
      var data=this.filterData.filter(e => e.Level ===this.selected);
    
      console.log(this.filterData);
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    }
    if(this.selected=="all"){
      //this.filterData=this.ELEMENT_DATA;
      data=this.filterData.filter(e => e.language ===this.languageselected);
    
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    }
    if(this.languageselected=="all"&&this.selected=="all")
    {
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    }
  }
  Save()
  {
    console.log(this.TempleteName.value);
    console.log(this.selection.selected[0].QuestionID);
    if(this.TempleteName.valid)
    {
      console.log("enter");
      for(var i=0;i<this.selection.selected.length;i++)
      {
        this.apidata.push({TemplateName:this.TempleteName.value,QID:this.selection.selected[i].QuestionID})
      }
      console.log("json="+JSON.stringify(this.apidata));
      let da=this.getdata.Template(this.apidata,this.score.value)
      .subscribe((res)=>{
          // console.log(res);
          let dd=res;
         console.log(dd);
         this.showMsg= true;
        });
         
    }
    
  }

  updatedata(){
    console.log(this.UpdateTamplate);
    console.log(this.selection.selected[0].QuestionID);
    if(this.UpdateTamplate!=null||this.UpdateTamplate!="")
    {
      console.log("enter");
      for(var i=0;i<this.selection.selected.length;i++)
      {
        this.apidata.push({TemplateName:this.UpdateTamplate,QID:this.selection.selected[i].QuestionID})
      }
      console.log("json="+JSON.stringify(this.apidata));
      let da=this.getdata.Template(this.apidata,this.score.value)
      .subscribe((res)=>{
        
          let dd=res;
         console.log(dd);
         if(dd=="true")
         {
          this.showMsg= true;
          
          this.router.navigate(['/question-template'], { queryParams: { Tamplate: this.UpdateTamplate } });
         }
         
        });
           
      
    }
  }
  
  

}
