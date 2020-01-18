import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5'
import * as mm from '@magenta/music/es6'
import WebMidi from 'webmidi'
import { MusicRNN, Player } from '@magenta/music/es6'
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
  public state:String= "chooseColor"
  private targetLabel:String
  private resultArray = []
  private sequence
  private noten_midi = {
    C: 60,
    D: 62,
    E: 64,
    F: 65,
    G: 67,
    A: 69,
    B: 71
  }
  private fillColor = [0, 0, 0]
  public color = "#000000"
  public melodyCreated:Boolean = false
  private player:Player

  constructor() { 
    let options = {
      inputs: ['x', 'y'],
      output: ['label'],
      task: 'classification'
    }
    this.model = ml5.neuralNetwork(options)
    this.model.load("../assets/model/model.json", this.modelLoaded)
    this.targetLabel = "C"
    this.player = new mm.Player()
  }

  ngOnInit() {
    this.drawp5 = new p5(this.sketch)
    //this.editp5 = new p5(this.editSketch)
  }

  private modelLoaded(err){
    if(err){
      console.log(err)
      return;
    }else{
      console.log("loaded")
    }
  }

  private sketch = (s) =>{
    s.setup = () =>{
      let canv = s.createCanvas(document.getElementById("canv").clientWidth-1, document.getElementById("canv").clientHeight-1).id("drawCanv").parent(document.getElementById("canv"))
      //let canv = s.createCanvas(document.getElementsByClassName("content")[0].clientWidth*2/5, document.getElementsByClassName("content")[0].clientHeight*2/3).id("drawCanv").parent(document.getElementById("canv"))
      //s.background(208, 208, 208)
      s.background(255, 255, 255)
    }

    s.mouseDragged = ()=>{
      if(this.state == "prediction"){
        let inputs = {
          x: s.mouseX,
          y: s.mouseY
        }
        this.model.classify(inputs, (err, results)=>{
          this.drawLine(err, results)
          //s.strokeWeight(20)
          //s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY)
        })
      }
    }
    s.mouseClicked = ()=>{
      let inputs = {
        x: s.mouseX,
        y: s.mouseY
      }
      if(this.state == "collection"){
        let target = {
          label: this.targetLabel
        }
        this.model.addData(inputs, target)
        s.noFill()
        s.stroke(0)
        s.circle(s.mouseX, s.mouseY, 20)
        s.fill(0)
        s.noStroke()
        s.textAlign(s.CENTER, s.CENTER)
        s.text(this.targetLabel, s.mouseX, s.mouseY)
      }
    }
    s.keyPressed = ()=>{
      if(s.key == "t"){
        this.state = "training"
        this.model.normalizeData()
        let options = {
          epochs: 300
        }
        this.model.train(options, this.whileTraining, () =>{
          console.log("finished training")
          this.state = "prediction"
          this.drawp5.background(208, 208, 208)
          this.model.save()
        })
      }else{
        this.targetLabel = s.key.toUpperCase()
      }
    }
    s.mouseReleased = () =>{
      //this.isDrawed = true
      if(this.state == "prediction"){
        this.createINoteSequence()
      }
      //console.log(this.resultArray)
    } 
  }
  
  private whileTraining(epoch, loss){
    console.log(epoch)
  }

  private drawLine(err, results){
    if (err) {
      console.log(err)
      return
    }
    console.log(this.color)
    this.drawp5.strokeWeight(20)
    this.drawp5.stroke(this.fillColor[0], this.fillColor[1], this.fillColor[2])
    this.drawp5.line(this.drawp5.mouseX, this.drawp5.mouseY, this.drawp5.pmouseX, this.drawp5.pmouseY)
    this.resultArray.push(results[0].label);
  }

  private editSketch = (s) =>{
    s.setup = () =>{
      let canv = s.createCanvas(document.getElementsByClassName("content")[0].clientWidth/2, document.getElementsByClassName("content")[0].clientHeight*2/3).parent(document.getElementById("canvEditMode"))
      s.background(208, 208, 208)
    }
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
    this.state = "controls"
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
    let quantizedSequence = mm.sequences.quantizeNoteSequence(this.sequence, 4)
    this.player.start(quantizedSequence)
    console.log(quantizedSequence)
  }
}
