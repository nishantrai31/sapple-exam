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
import {MatButtonModule, MatSidenavModule} from '@angular/material';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionFormComponent,
    NotFoundComponent,
    RegistrationComponent,
    ProfileComponent
    
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
      { path: 'Registration', component: RegistrationComponent },
      { path: 'profile', component: ProfileComponent, canActivate:[AuthGard]},
      { path: '**', component: NotFoundComponent }
     
    ]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule
    
  ],
  providers: [
    AuthGard,
    GetData
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
