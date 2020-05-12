import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { INoteSequence } from '@magenta/music/es6';
import { Melody } from './melody';

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

  insertUser(user: User) {
    return this.http.post<String>('http://localhost:3000/createUser', user);
  }

  findUser(user: User) {
    return this.http.post<String>('http://localhost:3000/findUser', user);
  }

  saveMelody(melody: Melody) {
    return this.http.post<String>("http://localhost:3000/saveMelody", melody);
  }

  findAllMelodies() {
    return this.http.get<[]>("http://localhost:3000/findAllMelodies");
  }

  deleteMelody(melody: Melody) {
    return this.http.post<String>("http://localhost:3000/deleteMel", melody);
  }
}
