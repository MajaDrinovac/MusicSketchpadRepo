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

  private createGrid(width, height){
    let offset = Math.round(height/7)
    for(let i = 1; i < 7; i++){
      this.editp5.strokeWeight(1)
      this.editp5.stroke(200)
      this.editp5.line(0, i*offset, width, i*offset)
    }
  }

  private createDictionary(height){
    let off = Math.round(height/7);
    let count = 1
    for(let note in this.noten_midi){
      this.y_notes[this.noten_midi[note]] = off*count
      count++
    }
    console.log(this.y_notes)
  }

  private createINoteSequence(){
    console.log("resultArray length: " + this.resultArray.length)
    let countNotes = 0
    let lastNumber = 0
    let notes = 0
    delete this.sequence
    this.sequence = {
        notes: [],
        totalTime: 0
    }
    for(let i = 0; i < this.resultArray.length; i++){
        if(i != 0){
            if(this.resultArray[i-1] == this.resultArray[i]){
                countNotes++
            }else{
                console.log("res: " + this.resultArray[i] + " modulo: " + (countNotes%10))
                notes++
                let dur = (countNotes%10)*0.1
                let x = {pitch: this.noten_midi[this.resultArray[i]], startTime: lastNumber, endTime: (lastNumber)+dur}
                lastNumber = lastNumber + dur
                this.sequence.notes.push(x)
                this.sequence.totalTime = x.endTime
            }
        }
    }
    this.melodyCreated = true
    console.log("total Time: " + this.sequence.totalTime)
  }

  public convertHex2Rgb(){
    this.melodyCreated = false
    let value = this.color.replace('#','');
    let r = parseInt(value.substring(0,2), 16);
    let g = parseInt(value.substring(2,4), 16);
    let b = parseInt(value.substring(4,6), 16);
    this.fillColor = [r, g, b]
    this.state = "prediction"
  }

  public disableControls(){
    console.log(this.melodyCreated)
    this.melodyCreated = false
  }

  public playMelody(){
    this.createINoteSequence()
    let quantizedSequence = mm.sequences.quantizeNoteSequence(this.sequence, 4)
    this.player.start(quantizedSequence)
    console.log(quantizedSequence)
  }

  public convertToEditMode(){
    this.editp5 = new p5(this.editSketch)
    this.createINoteSequence()
    let el = document.getElementById("canvEditMode")
    this.createGrid(el.clientWidth, el.clientHeight)
    this.displayMelody(this.sequence)
  }

  public delete(){
    
  }
}
