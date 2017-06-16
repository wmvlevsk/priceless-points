import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {MdButtonModule, MdSlideToggleModule, MdToolbarModule, MdSidenavModule, MdMenuModule, MdSnackBarModule, MdInputModule, MdAutocompleteModule, MdTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import * as $ from 'jquery';
import 'hammerjs';

import { LeaderboardService } from './leaderboard/leaderboard.service';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { FullListComponent } from './full-list/full-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailService } from './user-detail/user-detail.service';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './admin/admin.service';
import { AuthGuard } from './auth-guard.service';

import { LoginRoutingModule }      from './login/login-routing.module';
import { LoginComponent }          from './login/login.component';


// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'leaderboard',
    pathMatch: 'full'
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  },
  {
    path: 'fullList',
    component: FullListComponent
  },
  {
    path: 'user/:id',
    component: UserDetailComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    FullListComponent,
    UserDetailComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdButtonModule,
    BrowserAnimationsModule,
    MdSlideToggleModule,
    MdToolbarModule,
    MdSidenavModule,
    MdMenuModule,
    MdSnackBarModule,
    MdInputModule,
    MdAutocompleteModule,
    MdTabsModule,
    LoginRoutingModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LeaderboardService,
    UserDetailService,
    AdminService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
