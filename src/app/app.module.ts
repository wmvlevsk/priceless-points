import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import * as $ from 'jquery';

import { PostsService } from './posts/posts.service';
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
    path: 'posts',
    component: PostsComponent
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
    PostsComponent,
    LeaderboardComponent,
    FullListComponent,
    UserDetailComponent,
    FireworksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  exports: [
    RouterModule
  ],
  providers: [
    PostsService,
    LeaderboardService,
    UserDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
