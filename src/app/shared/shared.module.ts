import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CustomMaterialModule } from "./custom-material/custom-material.module";

@NgModule({
  imports: [CommonModule],
  exports: [CustomMaterialModule] 
})
export class SharedModule {}