import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
import { SoundFontPlayer, INoteSequence } from '@magenta/music/es6';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public melodies
  private sequence: INoteSequence
  private soundfont_player: SoundFontPlayer
  show: boolean;


  constructor(public router: Router, private httpService: HttpService, private data: DataService) { }

  ngOnInit() {

  }

  toSketchpad() {
    this.router.navigate(['/sketchpad']);
  }



}
