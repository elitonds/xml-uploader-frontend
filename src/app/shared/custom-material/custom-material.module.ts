import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatListModule
  ]
})
export class CustomMaterialModule { }
