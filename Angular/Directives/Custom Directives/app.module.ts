import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PanelComponent } from './panel/panel.component';
import { InputFormatDirective } from './input-format.directive';


@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    InputFormatDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
