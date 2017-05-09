import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {MdButtonModule, MdSlideToggleModule, MdToolbarModule, MdSidenavModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import * as $ from 'jquery';
import 'hammerjs';

import { LeaderboardService } from './leaderboard/leaderboard.service';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { FullListComponent } from './full-list/full-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailService } from './user-detail/user-detail.service';
import { FireworksComponent } from './fireworks/fireworks.component';

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
    path: 'fireworks',
    component: FireworksComponent
  },
  {
    path: 'user/:id',
    component: UserDetailComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LeaderboardComponent,
    FullListComponent,
    UserDetailComponent,
    FireworksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    BrowserAnimationsModule,
    MdSlideToggleModule,
    MdToolbarModule,
    MdSidenavModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LeaderboardService,
    UserDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
