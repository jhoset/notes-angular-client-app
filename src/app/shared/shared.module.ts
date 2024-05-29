import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressBar, MatProgressBarModule} from "@angular/material/progress-bar";



@NgModule({
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressBar,
    MatProgressBarModule
  ]
})
export class SharedModule { }
