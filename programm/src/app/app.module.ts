import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SketchpadComponent } from './sketchpad/sketchpad.component'
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule}from '@angular/material/grid-list';
import {MatIconModule}from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DisplayMelodyComponent } from './sketchpad/display-melody/display-melody.component'

@NgModule({
  declarations: [
    AppComponent,
    SketchpadComponent,
    DisplayMelodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
