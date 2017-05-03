import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';

@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  // instantiate posts to an empty array
  points: any = [];

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.leaderboardService.getFullList().subscribe(points => {
      this.points = points;
    });
  }

}