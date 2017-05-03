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
  dateInformation: Object;

  constructor(private leaderboardService: LeaderboardService) { }

  horizon: boolean = true;

  ngOnInit() {
    // Retrieve posts from the API
    this.leaderboardService.getFullList().subscribe(points => {
      this.points = points;
    });
    this.dateInformation = this.daysLeftInQuarter();
  }

  daysLeftInQuarter() {
    var today = new Date();
    var quarter = Math.floor((today.getMonth() + 3) / 3);
    var nextq;
    if (quarter == 4) {
      nextq = new Date(today.getFullYear() + 1, 1, 1);
    } else {
      nextq = new Date(today.getFullYear(), quarter * 3, 1);
    }
    var millis1 = today.getTime();
    var millis2 = nextq.getTime();
    return {daysLeft: Math.round((millis2 - millis1) / 1000 / 60 / 60 / 24),
    currentQuarter: quarter};
  }

}