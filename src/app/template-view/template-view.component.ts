import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { GetData } from '../services/get-data.service';
import { Validators, FormGroup,FormArray, FormControl } from '@angular/forms';
import { LIVE_ANNOUNCER_DEFAULT_OPTIONS } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';



// export interface PeriodicElement {
//   Question: string;
//   position:number;
//   QuestionID: number;
//   language:string;
//   Level:string
// }
export interface TamplateElement {
  position:number;
  Tamplate: string;
}

@Component({
  selector: 'template-view',
  templateUrl: './template-view.component.html',
  styleUrls: ['./template-view.component.css']
})
export class TemplateViewComponent implements OnInit {
  ELEMENT_DATA: TamplateElement[]=[];
  QuestionViwe: boolean=false;
  QuestionEdit: boolean=false;
  QuestionPage: boolean=true;
  selectedTm: string;
  QuestionEditPage: any;
  QuestionEditPage1: Array<{ option:string,OPID: number}>=[];
  updatedAnswer : Array<{QAnswers :string,OptionID: number}>=[];
  dataSource;
  filterData;
  qu:any;
  editpage:any;
  EmailID=new FormControl('', [
    Validators.required,Validators.email
]);
QuForm = new FormGroup({
  QID: new FormControl(null, [Validators.required]),
  Question: new FormControl('', [Validators.required]),
  
 level:  new FormControl('', [Validators.required]),
  language: new FormControl('', Validators.required)
 
});
  constructor(private getdata: GetData,private router: Router) { }

  ngOnInit() {
    let da=this.getdata.getTamplate()
    .subscribe((res)=>{
        // console.log(res);
        this.qu=res;
       console.log(this.qu);
       var ii=1;
       for(var i=0;i<this.qu.length;i++)
       {      
        
        if(this.ELEMENT_DATA.length>0)
        {
          if(this.ELEMENT_DATA.filter(e => e.Tamplate ===this.qu[i].TemplateName).length==0)
          {
            this.ELEMENT_DATA.push({ position: ii, Tamplate: this.qu[i].TemplateName});
          }
          
        }
        else{
          this.ELEMENT_DATA.push({ position: ii, Tamplate: this.qu[i].TemplateName});
        }
        
        ii++;
       }
       //this.filterData = this.ELEMENT_DATA.filter(item => item.Tamplate === obj.Tamplate);
       console.log(this.ELEMENT_DATA);
       this.dataSource = new MatTableDataSource<TamplateElement>(this.ELEMENT_DATA);
     //this.filterData=this.ELEMENT_DATA;
      });
     
    
  }

  displayedColumns: string[] = ['select', 'Tamplate'];
 
  selection = new SelectionModel<TamplateElement>(true, []);
  
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
  checkboxLabel(row?: TamplateElement): string {
    //console.log("checkboxLabel");
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
send()
{
  
  if(this.selection.selected.length>0)
  {
    console.log(this.selection.selected[0].Tamplate);   
    console.log(this.EmailID.value);   
    if(this.EmailID.value!=null&&this.EmailID.value!='') 
    {
      let da=this.getdata.CandidateQuestion(this.EmailID.value,this.selection.selected[0].Tamplate)
        .subscribe((res)=>{
            // console.log(res);
            let dd=res;
          console.log(dd);        
          });
   }
  }
}

edit(selectedTamplate: string)
{
  this.selectedTm=selectedTamplate;
  console.log(selectedTamplate);
  this.QuestionViwe=true;
  this.QuestionPage=false;
  this.getdata.getQuestions(selectedTamplate,1).subscribe(
    (data: any) => {
      this.editpage = data;
      console.log(this.editpage);
     
     }
     );
}

delete(selectedTamplate: string)
{
  console.log(selectedTamplate);
  let da=this.getdata.DeleteTamplate(selectedTamplate)
  .subscribe((res)=>{
      // console.log(res);
      let dd=res;
      var index=this.ELEMENT_DATA.findIndex(E=>E.Tamplate==selectedTamplate);
      if (index !== -1) {
        this.ELEMENT_DATA.splice(index, 1);
    }  
      
      this.dataSource = new MatTableDataSource<TamplateElement>(this.ELEMENT_DATA);
    console.log(dd);        
    });
}
Back()
{
  this.QuestionPage=true;
}
Back1()
{
  this.QuestionEdit=false;
  this.QuestionViwe=true;
}
editquestion(selectedQuestion: any)
{
  this.QuestionEdit=true;
  this.QuestionViwe=false;
  this.QuestionEditPage=selectedQuestion;
  console.log(this.QuestionEditPage);
    this.QuestionEditPage.Options.forEach((element:any) => {
      //console.log(element);
      this.QuForm.addControl( element.OPID,new FormControl(element.option));
    });
    this.QuestionEditPage.Answer.forEach((element:any) => {
      //console.log(element);
      this.QuForm.addControl( "AOptionID"+element.OptionID,new FormControl(element.QAnswers, [Validators.required]));
    });
    
  
  this.QuForm.controls.QID.setValue(this.QuestionEditPage.QID);
this.QuForm.controls.Question.setValue(this.QuestionEditPage.Question);
this.QuForm.controls.language.setValue(this.QuestionEditPage.language);

this.QuForm.controls.level.setValue(this.QuestionEditPage.Exp);
console.log(this.QuForm);

//console.log(this.QuestionEditPage1);
//  updatedvalue.controls.forEach(element  => {
//    console.log(element);
  
//  });
//console.log(this.QuForm.value);
}
Update(){
  this.QuestionEditPage.Options.forEach(element => {
    this.QuestionEditPage1.push({option:this.QuForm.controls[element.OPID].value,OPID:element.OPID});
  });
  
  this.QuestionEditPage.Answer.forEach(element => {
    this.updatedAnswer.push({QAnswers:this.QuForm.controls["AOptionID"+element.OptionID].value,OptionID:element.OptionID});
  });
console.log(this.updatedAnswer);
console.log(this.QuestionEditPage1);

let da=this.getdata.updateQuestion(this.QuForm.controls.QID.value,this.QuForm.controls.Question.value,this.QuestionEditPage1,this.updatedAnswer,this.QuForm.controls.level.value,this.QuForm.controls.language.value)
  .subscribe((res)=>{
      // console.log(res);
      let dd=res;

    console.log(dd);        
    });
    this.router.navigate(['/Tamplate_Viwe']);
    
}
AddQuetion()
{
  this.router.navigate(['/question-template'], { queryParams: { Tamplate: this.selectedTm } });
}
get Options(): FormArray {
  return this.QuForm.get('Options') as FormArray;
} 

}
