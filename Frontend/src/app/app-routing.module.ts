import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add/add-data/add-data.component';
import { HomeComponent } from './home/home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path:"add",
    component:AddDataComponent
  },
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"about",
    component:AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
