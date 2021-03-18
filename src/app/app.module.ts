import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatDividerModule
} from '@angular/material';

import { EditableModule } from './document/editable.module';
import { EditableToolbar } from './toolbar/editable-toolbar.component';
import { EditableMenu } from './menu/editable-menu.component';
import { EditableLongpress } from './longpress/longpress.component';
import { AppComponent } from './app.component';

@NgModule({
  imports:      [   
    RouterModule.forRoot([]),
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule, 
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatDividerModule,
    EditableModule
  ],
  
  declarations: [ 
    AppComponent,
    EditableMenu, 
    EditableToolbar, 
    EditableLongpress
  ],

  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
