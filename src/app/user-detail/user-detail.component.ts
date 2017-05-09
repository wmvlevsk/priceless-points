import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { UserDetailService } from './user-detail.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() employeeID: number;
  employeeInfo: Object;
  constructor(
    private userDetailService: UserDetailService,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userDetailService.getEmployeeInfo(+params['id']))
      .subscribe(info => {
        this.employeeInfo = info;
      });
  }

  goBack(): void {
    this.location.back();
  }

}
