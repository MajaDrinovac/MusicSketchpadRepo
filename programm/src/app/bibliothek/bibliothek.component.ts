import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { SoundFontPlayer, INoteSequence } from '@magenta/music/es6';
import * as mm from '@magenta/music/es6'

@Component({
  selector: 'app-bibliothek',
  templateUrl: './bibliothek.component.html',
  styleUrls: ['./bibliothek.component.scss']
})
export class BibliothekComponent implements OnInit {
  public melodies
  private sequence:INoteSequence
  private soundfont_player:SoundFontPlayer
  constructor(private httpService:HttpService) { 
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
      element.program = 1
    });
    this.soundfont_player.start(this.sequence)
  }
}
