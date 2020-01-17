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
  private editp5:p5
  private model

  constructor() { 
    let options = {
      inputs: ['x', 'y'],
      output: ['label'],
      task: 'classification'
    }
    this.model = ml5.neuralNetwork(options)
  }

  ngOnInit() {
    this.drawp5 = new p5(this.sketch)
    this.editp5 = new p5(this.editSketch)
  }

  private sketch = (s) =>{
    s.setup = () =>{
      let canv = s.createCanvas(document.getElementsByClassName("content")[0].clientWidth/2, document.getElementsByClassName("content")[0].clientHeight*2/3).parent(document.getElementById("canv"))
      s.background(208, 208, 208)
    }
  }
  private editSketch = (s) =>{
    s.setup = () =>{
      let canv = s.createCanvas(document.getElementsByClassName("content")[0].clientWidth/2, document.getElementsByClassName("content")[0].clientHeight*2/3).parent(document.getElementById("canvEditMode"))
      s.background(208, 208, 208)
    }
  }

}
