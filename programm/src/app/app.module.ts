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
import {MatCardModule} from '@angular/material/card';
import { ControlsComponent } from './sketchpad/controls/controls.component'
import { LandingpageComponent } from './landingpage/landingpage.component';
import { RouterModule, Routes } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';

const appRoutes: Routes = [
  { path: 'landingpage', component: LandingpageComponent },
  { path: 'sketchpad', component: SketchpadComponent },
  { path: '',
    redirectTo: '/landingpage',
    pathMatch: 'full'
}


];


@NgModule({
  declarations: [
    AppComponent,
    SketchpadComponent,
    ControlsComponent,
    LandingpageComponent
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
    MatProgressSpinnerModule,
    MatCardModule,
    MatSelectModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
