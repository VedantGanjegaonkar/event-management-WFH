import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component'; 

const routes: Routes = [
  {path:'signup', component:SignupComponent}, 
  {path:'login', component:LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  // { path: '',  component:LoginComponent }, // Default route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
