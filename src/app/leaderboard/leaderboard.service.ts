import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LeaderboardService {
  constructor(private http: Http) { }
  // Get all posts from the API
  getFullList() {
    return this.http.get('/api/points')
      .map(res => res.json());
  }
}