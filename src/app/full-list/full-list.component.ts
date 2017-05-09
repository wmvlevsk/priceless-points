import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.scss']
})
export class FullListComponent implements OnInit {

  points: any = [];
  lastTog: string;
  sortDesc: boolean = true;
  constructor(private leaderboardService: LeaderboardService,
    private location: Location) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.leaderboardService.getFullList().subscribe(points => {
      this.points = points;
    });
  }

  sortParam(param: string): void {
    var _this = this;
    var sortParam = {
      'FIRST': function () {
        if (_this.lastTog === param) {
          _this.sortDesc = !_this.sortDesc;
        } else {
          _this.sortDesc = true;
        }
        _this.points = _this.points.sort(function (a, b) {
          if (_this.sortDesc) { return b.FIRST_NAME.localeCompare(a.FIRST_NAME) }
          else { return a.FIRST_NAME.localeCompare(b.FIRST_NAME) }
        });
        _this.lastTog = 'FIRST';
      },
      'LAST': function () {
        if (_this.lastTog === param) {
          _this.sortDesc = !_this.sortDesc;
        } else {
          _this.sortDesc = true;
        }
        _this.points = _this.points.sort(function (a, b) {
          if (_this.sortDesc) { return b.LAST_NAME.localeCompare(a.LAST_NAME) }
          else { return a.LAST_NAME.localeCompare(b.LAST_NAME) }
        });
        _this.lastTog = 'LAST';
      },
      'Q1': function () {
        if (_this.lastTog === param) {
          _this.sortDesc = !_this.sortDesc;
        } else {
          _this.sortDesc = true;
        }
        _this.points = _this.points.sort(function (a, b) {
          if (_this.sortDesc) { return b.Q1_PTS - a.Q1_PTS; }
          else { return a.Q1_PTS - b.Q1_PTS; }
        });
        _this.lastTog = 'Q1';
      },
      'Q2': function () {
        if (_this.lastTog === param) {
          _this.sortDesc = !_this.sortDesc;
        } else {
          _this.sortDesc = true;
        }
        _this.points = _this.points.sort(function (a, b) {
          if (_this.sortDesc) { return b.Q2_PTS - a.Q2_PTS; }
          else { return a.Q2_PTS - b.Q2_PTS; }
        });
        _this.lastTog = 'Q2';
      },
      'Q3': function () {
        if (_this.lastTog === param) {
          _this.sortDesc = !_this.sortDesc;
        } else {
          _this.sortDesc = true;
        }
        _this.points = _this.points.sort(function (a, b) {
          if (_this.sortDesc) { return b.Q3_PTS - a.Q3_PTS; }
          else { return a.Q3_PTS - b.Q3_PTS; }
        });
        _this.lastTog = 'Q3';
      },
      'Q4': function () {
        if (_this.lastTog === param) {
          _this.sortDesc = !_this.sortDesc;
        } else {
          _this.sortDesc = true;
        }
        _this.points = _this.points.sort(function (a, b) {
          if (_this.sortDesc) { return b.Q4_PTS - a.Q4_PTS; }
          else { return a.Q4_PTS - b.Q4_PTS; }
        });
        _this.lastTog = 'Q4';
      },
      'FY': function () {
        if (_this.lastTog === param) {
          _this.sortDesc = !_this.sortDesc;
        } else {
          _this.sortDesc = true;
        }
        _this.points = _this.points.sort(function (a, b) {
          if (_this.sortDesc) { return b.FY_PTS - a.FY_PTS; }
          else { return a.FY_PTS - b.FY_PTS; }
        });
        _this.lastTog = 'FY';
      }
    }
    sortParam[param]();
  }

  goBack(): void {
    this.location.back();
  }
}