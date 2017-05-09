import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';

@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  // instantiate posts to an empty array
  points: any = [];
  dateInformation: Object;
  selectedEmployeeID: Number;

  constructor(private leaderboardService: LeaderboardService) { }

  horizon: boolean = false;

  ngOnInit() {
    // Retrieve posts from the API
    this.dateInformation = this.daysLeftInQuarter();
    this.leaderboardService.getFullList().subscribe(points => {
      this.points = points.sort(function(a,b){return b.quarter-a.quarter});
    });

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
    var nexty = new Date(new Date().getFullYear(), 11, 31);
    var millis1 = today.getTime();
    var millis2 = nextq.getTime();
    var millis3 = nexty.getTime();
    return {
      daysLeft: Math.round((millis2 - millis1) / 1000 / 60 / 60 / 24),
      daysLeftInYear: Math.round((millis3 - millis1) / 1000 / 60 / 60 / 24),
      currentQuarter: quarter
    };
  }

  onSelect(employeeID: Number): void {
    this.selectedEmployeeID = employeeID;
  }

  toggleView(){
    this.horizon = !this.horizon;
    if(!this.horizon){
      this.points = this.points.sort(function(a,b){return b.quarter-a.quarter});
    }
    else{
      this.points = this.points.sort(function(a,b){return b.FY_PTS-a.FY_PTS});
    }
  }

}