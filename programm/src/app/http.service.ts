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
    console.log("dha")
    return this.http.get<User[]>('http://localhost:3000/findAllUsers');
  }

  login(user: User){
    console.log("da")
    return this.http.post<String>('http://loclhost:3000/login', user)
  }

  insertUser(user:User) {
    console.log(user)
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
