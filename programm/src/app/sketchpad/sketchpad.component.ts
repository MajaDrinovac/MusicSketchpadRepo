import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5'
import * as mm from '@magenta/music/es6'
import WebMidi from 'webmidi'
import { MusicRNN } from '@magenta/music/es6'
declare let ml5:any

@Component({
  selector: 'sketchpad',
  templateUrl: './sketchpad.component.html',
  styleUrls: ['./sketchpad.component.scss']
})
export class SketchpadComponent implements OnInit {
  private drawp5:p5

  constructor() { 

  }

  ngOnInit() {
    this.drawp5 = new p5(this.sketch)
  }

  private sketch = (s) =>{
    s.setup = () =>{
      let canv = s.createCanvas(500, 500).parent(document.getElementById("canv"))
      s.background(208, 208, 208)
    }
  }

}
