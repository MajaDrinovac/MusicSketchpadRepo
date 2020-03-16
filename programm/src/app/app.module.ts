import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SketchpadComponent } from './sketchpad/sketchpad.component'
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsComponent } from './sketchpad/controls/controls.component';
import { BibliothekComponent } from './bibliothek/bibliothek.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog'
import { ColorPickerModule } from 'ngx-color-picker'
import { MatListModule } from '@angular/material/list'


import { MatSelectModule } from '@angular/material/select';
import { DialogComponent } from './sketchpad/dialog/dialog.component';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorBlockModule } from 'ngx-color/block'; // <color-block></color-block>
import { ColorCompactModule } from 'ngx-color/compact'; // <color-compact></color-compact>
import { ColorCircleModule } from 'ngx-color/circle'; // <color-circle></color-circle>
import { ColorSwatchesModule } from 'ngx-color/swatches'; // <color-swatches></color-swatches>
import { ColorChromeModule } from 'ngx-color/chrome';
import { RegistrierenComponent } from './registrieren/registrieren.component';
import { ProfilComponent } from './profil/profil.component';

const appRoutes: Routes = [
  { path: 'landingpage', component: LandingpageComponent },
  { path: 'sketchpad', component: SketchpadComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrieren', component: RegistrierenComponent },
  { path: 'bibliothek', component: BibliothekComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nav', component: NavComponent },
  { path: 'profil', component: ProfilComponent },
  {
    path: '',
    redirectTo: '/landingpage',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    SketchpadComponent,
    ControlsComponent,
    LandingpageComponent,
    LoginComponent,
    BibliothekComponent,
    DashboardComponent,
    NavComponent,
    DialogComponent,
    RegistrierenComponent,
    ProfilComponent
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
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    ColorPickerModule,
    ColorSketchModule,
    ColorBlockModule,
    ColorCompactModule,
    ColorCircleModule,
    ColorSwatchesModule,
    ColorChromeModule,
    MatListModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
