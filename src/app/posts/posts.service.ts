import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  constructor(private http: Http) { }

  url = 'http://localhost:3000';
  // Get all posts from the API
  getAllPosts() {
    return this.http.get(this.url + '/api/posts')
      .map(res => res.json());
  }
}
