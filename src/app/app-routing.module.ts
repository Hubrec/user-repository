import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {UserDetailsComponent} from "./user/user-details/user-details.component";
import {UpdateUserComponent} from "./user/update-user/update-user.component";
import {AddUserComponent} from "./user/add-user/add-user.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent
  },
  {
    path: 'update/:id',
    component: UpdateUserComponent
  },
  {
    path: 'add',
    component: AddUserComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
