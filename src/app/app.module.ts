import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import{GetData} from './services/get-data.service'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { QuestionFormComponent } from './question-form/question-form.component';
import { RouterModule } from '@angular/router';
import { AuthGard } from './services/auth-gard.service';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatSidenavModule, MatPaginator, MatPaginatorModule, MatExpansionModule, MatCard, MatCardModule, MatInputModule, MatSelectModule, MatCheckboxModule,MatRadioModule, MatProgressSpinnerModule,MatIconModule} from '@angular/material';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { QuestionViewComponent } from './question-view/question-view.component';
import { ExaminationComponent } from './examination/examination.component';
import { QuestionTemplateComponent } from './question-template/question-template.component';

import {MatTableModule} from '@angular/material/table';
import { TestComponent } from './test/test.component';
import { TemplateViewComponent } from './template-view/template-view.component';
import { CandidateViewComponent } from './candidate-view/candidate-view.component';
import { HomePageComponent } from './home-page/home-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionFormComponent,
    NotFoundComponent,
    RegistrationComponent,
    ProfileComponent,
    EditprofileComponent,
    QuestionViewComponent,
    ExaminationComponent,
    QuestionTemplateComponent,
    TestComponent,
    TemplateViewComponent,
    CandidateViewComponent,
    HomePageComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'question-form', component: QuestionFormComponent,
      canActivate:[AuthGard] },
      { path: 'question-view', component:  QuestionViewComponent, canActivate:[AuthGard]},
      { path: 'Registration', component: RegistrationComponent, canActivate:[AuthGard] },
      { path: 'profile', component: ProfileComponent, canActivate:[AuthGard]},
      { path: 'editprofile', component: EditprofileComponent, canActivate:[AuthGard]},
      { path: 'examination', component: ExaminationComponent},
      { path: 'question-template', component: QuestionTemplateComponent},
      { path: 'Template_View', component: TemplateViewComponent},
      { path: 'candidate-view', component: CandidateViewComponent},
      { path: 'homepage', component: HomePageComponent},  
      { path: 'test', component: TestComponent},
      { path: '**', component: NotFoundComponent }
     
    ]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule
    
  ],
  providers: [
    AuthGard,
    GetData
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
