import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getUser() {
    return this.http.get<User[]>('http://localhost:3000/findAllUsers');
  }

  insertUser(json: String) {
    //return this.http.post<String>('http://localhost:3000/createUser' + json);
  }
}
