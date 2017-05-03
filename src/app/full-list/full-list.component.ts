import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

@Component({
  selector: 'app-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.css']
})
export class FullListComponent implements OnInit {

  points: any = [];
  constructor(private leaderboardService: LeaderboardService) { }


  ngOnInit() {
    // Retrieve posts from the API
    this.leaderboardService.getFullList().subscribe(points => {
      this.points = points;
    });
  }

}
