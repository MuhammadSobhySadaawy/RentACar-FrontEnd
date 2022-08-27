import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarFilterComponent } from './car-filter/car-filter.component';

const routes: Routes = [{path:'',component:CarFilterComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
