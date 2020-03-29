import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as p5 from 'p5'
import * as mm from '@magenta/music/es6'
import WebMidi from 'webmidi'
import { MusicRNN, Player } from '@magenta/music/es6'
import { core } from '@angular/compiler';
import { User } from '../user';


@Component({
  selector: 'landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  httpService : HttpService
  user : Array<User>

  constructor(httpService : HttpService) {
    this.httpService = httpService
   }

  ngOnInit() {
    
  }

  getUser(){

    console.log("test")
    this.httpService.getUser().subscribe(value => console.log(value), 
    error => console.log('from sub ' + error), 
    () => console.log('completed'))

  }

}
