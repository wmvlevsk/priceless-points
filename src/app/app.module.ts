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

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LeaderboardComponent
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
