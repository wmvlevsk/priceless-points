import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  reader: FileReader = new FileReader();
  constructor( private AdminService: AdminService) { }
  data: any = [];

  ngOnInit() {
  }

  private _onChange(files: FileList): void {
    let reader: FileReader = new FileReader();
    if (files && files.length > 0) {
      let file: File = files.item(0);

      reader.onload = (e) => {
        let csv: string = reader.result;
        //From here you can either use a csv parse library, or your own
        let allTextLines = csv.split(/\r\n|\n/);
        let headers = allTextLines[0].split(',');
        let lines = [];

        for ( let i = 0; i < allTextLines.length; i++) {
            // split content based on comma
            let data = allTextLines[i].split(',');
            if (data.length == headers.length) {
                let tarr = [];
                for ( let j = 0; j < headers.length; j++) {
                    tarr.push(data[j]);
                }
                lines.push(tarr);
            }
        }
        this.data = lines;
        console.log(this.data);
      }

      reader.readAsText(file);
    }
  }

  bulkInsertEmployees(){
    this.data.shift();
    let body = this.data;
    this.data = [];
    this.AdminService.loadEmployees(body);
  }
}
