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
    this.httpService.findAllMelodies().subscribe((res) => { this.melodies = res; this.displayMelodies() })

  }

  displayMelodies() {
    console.log(this.melodies)
    if (this.melodies == null || this.melodies == 0) {
      this.show = true;
      //(<HTMLInputElement>document.getElementById("nomelody")).style.visibility='visible';
    } else {
      this.show = false;
      //(<HTMLInputElement>document.getElementById("nomelody")).style.visibility='hidden';
    }
  }

  playMelody(melody) {
    let players = []
    let index = 0
    melody.melody.forEach(track => {
      players.push(new SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus'))
      players[index].loadSamples(track)
      index++
    });
    for (let i = 0; i < melody.melody.length; i++) {
      players[i].start(melody.melody[i])
    }
  }

  openEditMode(melody) {
    this.data.edit = true
    this.data.editMelody = melody
    this.router.navigate(['/editMelody'])
  }

}
