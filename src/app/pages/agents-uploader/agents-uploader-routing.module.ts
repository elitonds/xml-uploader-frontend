import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsUploaderComponent } from './agents-uploader.component';

const routes: Routes = [
  { path: '', component: AgentsUploaderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsUploaderRoutingModule { }
