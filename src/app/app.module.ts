import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

import { PostsService } from './posts/posts.service';
import { LeaderboardService } from './leaderboard/leaderboard.service';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { FullListComponent } from './full-list/full-list.component';

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
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LeaderboardComponent,
    FullListComponent
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
    LeaderboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
