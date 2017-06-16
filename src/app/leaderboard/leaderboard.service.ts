import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LeaderboardService {
  constructor(private http: Http) { }
  // Get all posts from the API
  url = 'http://localhost:3000';

  getFullList() {
    return this.http.get(this.url + '/api/points')
      .map(res => res.json());
  }

}