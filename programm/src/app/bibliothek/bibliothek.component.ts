import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { SoundFontPlayer, INoteSequence } from '@magenta/music/es6';
import * as mm from '@magenta/music/es6'
import { Router } from '@angular/router';

@Component({
  selector: 'app-bibliothek',
  templateUrl: './bibliothek.component.html',
  styleUrls: ['./bibliothek.component.scss']
})
export class BibliothekComponent implements OnInit {
  public melodies
  private sequence:INoteSequence
  private soundfont_player:SoundFontPlayer
  constructor(public router:Router,private httpService:HttpService) { 
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
    let players = []
    let index = 0
    melody.melody.forEach(track => {
      players.push(new SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus'))
      players[index].loadSamples(track)
      index++
    });
    for(let i = 0; i < melody.melody.length; i++){
      players[i].start(melody.melody[i])
    }
  }

  openEditMode(melody){
    
    this.router.navigate(['/sketchpad'])
  }
}
