import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomMaterialModule } from 'src/app/shared/custom-material/custom-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgentsUploaderRoutingModule } from './agents-uploader-routing.module';
import { AgentsUploaderComponent } from './agents-uploader.component';


@NgModule({
  declarations: [
    AgentsUploaderComponent
  ],
  imports: [
    CommonModule,
    AgentsUploaderRoutingModule,
    SharedModule,
    CustomMaterialModule,    
    MatIconModule,
  ]
})
export class AgentsUploaderModule { }
