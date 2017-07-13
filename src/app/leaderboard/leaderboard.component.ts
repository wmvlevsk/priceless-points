import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import * as $ from 'jquery';

@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  // instantiate posts to an empty array
  filteredStates: any;
  points: any = [];
  dateInformation: Object;
  selectedEmployeeID: Number;
  quarterlyView: any;

  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(private leaderboardService: LeaderboardService) { }

  horizon: boolean = false;
 
  ngOnInit() {
    // Retrieve posts from the API
    this.dateInformation = this.daysLeftInQuarter();
   
    quarterly = true;
    this.leaderboardService.getFullList().subscribe(points => {
      if(quarterly){
        this.points = points.sort(function(a,b){return b.quarter-a.quarter});
        sum = this.points[0].quarter;  // rank 1.
      } else {
        this.points = this.points.sort(function(a,b){return b.FY_PTS-a.FY_PTS});
        sum = this.points[0].FY_PTS; // rank 1.
      } 
    
    this.callScoreboard();
  
    this.filteredOptions = this.myControl.valueChanges
        .startWith(null)
        .map(val => val ? this.filter(val) : this.points.slice());
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
      sum = this.points[0].quarter;
    }
    else{
      this.points = this.points.sort(function(a,b){return b.FY_PTS-a.FY_PTS});
      sum = this.points[0].FY_PTS;
    }
  }

  filter(val: string): string[] {
      return this.points.filter(point => new RegExp(`^${val}`, 'gi').test(point.FIRST_NAME + " " + point.LAST_NAME)); 
   }

 callScoreboard(){
  this.quarterlyView = quarterly;
  setTimeout( function(){
     $('.js-podium').each(function(){
        var t = $(this);
        setTimeout( function(){ 
          t.addClass('is-visible');
          $('.searchContainer').addClass('is-visible');
          $('.viewLabel').addClass('is-visible');
          $('.switchButtons').addClass('is-visible');
          var h = t.data('height');
          t.find('.scoreboard__podium-base').css('height', h).addClass('is-expanding');
        }, time);
      });
   
   if(quarterly){
    startBars();
   } else {
    startAltBars();
   }
    countUp();   
  }, 50);
}

setId(employeeID: Number){
  searchId = employeeID;
}

searchScroll(){
    var diff = $("#" + searchId).offset().top - $('#scoreboard__items').offset().top;
    prevSearchOffSet += diff;
    if( diff < 1 && diff > -1) {
      // DONT SCROLL
    } else {
      $('#scoreboard__items').animate({
        scrollTop:prevSearchOffSet
      }, 800);
  }
  
}

switch(){
  
  // //$('body').stop().removeClass('mat-app-background');
  // $('.card').stop().removeClass('mat-app-background');
  // $('.card').stop().addClass('dark-mode');
  //  $('.js-podium').each(function(){
  //     var t = $(this);
  //      t.removeClass('is-visible');
  //  });
  //   $('.searchContainer').removeClass('is-visible');
  this.toggleView();
  if(quarterly){
  quarterly = false;
  } else {
  quarterly = true;  
  }
   this.callScoreboard();

}

}

//**************************LEADERBOARD FUNCTIONS 
 var time = 250;
 var quarterly = true;
 var sum;
 var searchId;   
 var prevSearchOffSet = 0;

function countUp() {
  $('.scoreboard__item').each(function() {
  var $this = $(this),
      countTo = $this.find('.js-number').text();
  
  $({ countNum: 0}).animate({
    countNum: countTo
  },
  {
    duration: 500,
    easing:'linear',
    step: function() {
      $this.find('.js-number').text(Math.floor(this.countNum));
    },
    complete: function() {
      $this.find('.js-number').text(this.countNum);
    }

    });  
  }); 
}

function startBars() {
 $('.js-bar').each(function() {
  // calculate %.
  var t = $(this);
   setTimeout( function(){ 
  var width = Number(t.parent('div').find('.js-number').text());
  width = width  / sum * 100;
     width = Math.round(width);
  t.find('.scoreboard__bar-bar').css('width',  width + "%");
     t.parent('div').addClass('is-visible');
      }, time + 500);
   time += 0;
  });
}

function startAltBars() {
 $('.js-bar').each(function() {
  // calculate %.
  var t = $(this);
   setTimeout( function(){ 
  var width = Number(t.parent('div').find('.js-number').text());
  width = width  / sum * 100;
     width = Math.round(width);
  t.find('.alt__scoreboard__bar-bar').css('width',  width + "%");
     t.parent('div').addClass('is-visible');
      }, time + 500);
   time += 0;
  });
}

function scrollTo(element, to, duration) {
        if (duration < 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 2;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        scrollTo(element, to, duration - 2);
    }, 10);
}

// $('.toggle').on('click', function() {
//   $('.container').stop().addClass('.dark-mode');
// });

// $('.close').on('click', function() {
//   $('.container').stop().removeClass('.dark-mode');
// });