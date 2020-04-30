import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { SoundFontPlayer, INoteSequence } from '@magenta/music/es6';
import * as mm from '@magenta/music/es6'
import { DataService } from '../data.service';

@Component({
  selector: 'app-bibliothek',
  templateUrl: './bibliothek.component.html',
  styleUrls: ['./bibliothek.component.scss']
})
export class BibliothekComponent implements OnInit {
  public melodies
  private sequence:INoteSequence
  private soundfont_player:SoundFontPlayer
  constructor(private httpService:HttpService, public dataService:DataService) { 
    this.soundfont_player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
  }

  ngOnInit() {
    this.httpService.findAllMelodies().subscribe((res)=>{this.melodies = res; this.displayMelodies()})
    //console.log(this.melodies)
  }
  displayMelodies(){
    console.log(this.melodies)
  }

  playMelody(melody){
    console.log(melody)
    this.sequence = {
      notes: melody.notes,
      totalTime: melody.totalTime
    }
    console.log(this.sequence)
    let q = this.soundfont_player.loadSamples(this.sequence)
    this.sequence.notes.forEach(element => {
      element.program = melody.instrument
    });
    this.soundfont_player.start(this.sequence)
  }

  sendMelody(melody){
    console.log("melodie:" + melody)
    this.dataService.melody = melody;
  }
}
