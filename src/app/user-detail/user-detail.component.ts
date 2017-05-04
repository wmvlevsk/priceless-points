import { Component, OnInit, Input } from '@angular/core';
import { UserDetailService } from './user-detail.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() employeeID: number;
  employeeInfo: Object;
  constructor(private userDetailService: UserDetailService) { }


  ngOnInit() {
  }

  retrieveInfo(){
        // Retrieve posts from the API
    this.userDetailService.getEmployeeInfo(this.employeeID).subscribe(info => {
      this.employeeInfo = info;
      console.log(this.employeeInfo);
    });
  }

}
