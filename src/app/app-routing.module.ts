import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component'; 

const routes: Routes = [
  {
    path:  "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
   path: "home",
   component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }
