import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginComponent} from'../app/login/login.component'
import{RegistrationComponent} from'../app/registration/registration.component'
import { UsersComponent } from './users/users.component';
import { PaginationComponent } from './pagination/pagination.component';

const routes: Routes = [
  {component: LoginComponent, path: 'login'},
  {component: RegistrationComponent, path: 'registration'},
  {component: UsersComponent, path: 'users'},
  {component: PaginationComponent, path:'mat-table'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
