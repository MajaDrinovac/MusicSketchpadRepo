import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { INoteSequence } from '@magenta/music/es6';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  findUser() {
    throw new Error("Method not implemented.");
  }

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getUser() {
    return this.http.get<User[]>('http://localhost:3000/findAllUsers');
  }

  insertUser(user:User) {
    console.log(user)
    return this.http.post<String>('http://localhost:3000/createUser', user);
  }

  saveMelody(melody:INoteSequence){
    console.log(melody)
    return this.http.post<String>("http://localhost:3000/saveMelody", melody);
  }

  findAllMelodies(){
    return this.http.get<[]>("http://localhost:3000/findAllMelodies");
  }
}
