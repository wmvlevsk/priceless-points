import { Component, OnInit, HostListener } from '@angular/core';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { Location } from '@angular/common';
import * as $ from 'jquery';

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
      this.sortParam('FIRST');
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
          if (_this.sortDesc) { return a.FIRST_NAME.localeCompare(b.FIRST_NAME) }
          else { return b.FIRST_NAME.localeCompare(a.FIRST_NAME) }
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
          if (_this.sortDesc) { return a.LAST_NAME.localeCompare(b.LAST_NAME) }
          else { return b.LAST_NAME.localeCompare(a.LAST_NAME) }
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

  // When the user scrolls down 20px from the top of the document, show the button
  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    this.scrollFunction();
  }
  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      Array.from(document.getElementsByClassName("top")).forEach(function (item) {
        $(item).css("display", "block");
      })
    } else {
      Array.from(document.getElementsByClassName("top")).forEach(function (item) {
        $(item).css("display", "none");
      })
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  exportToCSV() {
    var data, filename, link;
    var csv = this.convertArrayOfObjectsToCSV(this.points);
    if (csv == null) return;

    filename = 'pulsePointsLeaderboard_' + new Date().toJSON().replace(/-/g,'/') + '.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  }

  convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    columnDelimiter = ',';
    lineDelimiter = "\n";

    keys = Object.keys(args[0]);
    keys.splice(keys.indexOf("quarter"), 1);
    keys.splice(keys.indexOf("MOD_DT"), 1);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    args.forEach(function (item) {
      ctr = 0;
      keys.forEach(function (key) {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }
}