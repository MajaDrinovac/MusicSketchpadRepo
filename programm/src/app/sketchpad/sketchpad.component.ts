import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5'
import * as mm from '@magenta/music/es6'
import WebMidi from 'webmidi'
import { MusicRNN, Player } from '@magenta/music/es6'
import { core } from '@angular/compiler';
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
  public state:String= "prediction"
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
  private noten_midi_drums = {
    C: 36,
    D: 38,
    E: 40,
    F: 42,
    G: 45,
    A: 46,
    B: 48
  }
  private y_notes = {}
  private fillColor = [113, 134, 235]
  public color = "#7186EB"
  public melodyCreated:Boolean = false
  private player:Player
  public deleteOption:Boolean = false
  private mRNN = new MusicRNN("https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn")
  private continuedp5:p5
  private editModeVisible:Boolean = false
  private continueVisible:String = "not"

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
        //this.createINoteSequence()
        if(this.state == "prediction"){
          this.melodyCreated = true
          //this.state = "controls"
          this.deleteOption = true
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
      let canvElement = document.getElementById("canvEditMode")
      //let canv = s.createCanvas(document.getElementsByClassName("content")[0].clientWidth/2, document.getElementsByClassName("content")[0].clientHeight*2/3).parent(document.getElementById("canvEditMode"))
      let canv = s.createCanvas(canvElement.clientWidth-1, canvElement.clientHeight-1)
      s.background(0, 0, 0)
      this.createDictionary(canvElement.clientHeight)
      //this.createGrid(canvElement.clientWidth,canvElement.clientHeight)
      /*let offset = Math.round(canvElement.clientHeight/7)
      for(let i = 1; i < 7; i++){
        s.strokeWeight(1)
        s.stroke(200)
        s.line(0, i*offset, canvElement.clientWidth, i*offset)
      }*/
      //alert(canvElement.clientHeight + ", " + Math.floor(canvElement.clientHeight/7))
    }
  }

  private displayMelody(seq, p5sketch){
    let durPrev = 0;
    let displaySequence = []
    let qSequence

    console.log(mm.sequences.isQuantizedSequence(seq))
    if(mm.sequences.isQuantizedSequence(seq) == true){
      qSequence = seq
    }else{
      qSequence = mm.sequences.quantizeNoteSequence(seq, 4)
    }
    displaySequence = qSequence.notes

    let anz = displaySequence.length
    let getSteps = displaySequence[anz-1].quantizedEndStep
    console.log("steps: " + getSteps + " res: " + Math.floor(document.getElementById("canvEditMode").clientWidth/getSteps))
    let res = Math.floor(document.getElementById("canvEditMode").clientWidth/getSteps)
    for(let i = 0; i < displaySequence.length; i++){
      let pitch = displaySequence[i].pitch
      let dur = displaySequence[i].quantizedEndStep - displaySequence[i].quantizedStartStep

      p5sketch.rect(durPrev*res, this.y_notes[pitch], dur*res, res)
      //durPrev is offset for the next rect
      durPrev += dur
  }
  }

  private createGrid(width, height, p5sketch){
    let offset = Math.round(height/7)
    for(let i = 1; i <= 7; i++){
      p5sketch.strokeWeight(1)
      p5sketch.stroke(200)
      p5sketch.line(0, i*offset, width, i*offset)
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
    //this.state = "prediction"
  }

  public disableControls(){
    console.log(this.melodyCreated)
    this.melodyCreated = false
    this.deleteOption = false
  }

  public playMelody(){
    this.createINoteSequence()
    let quantizedSequence = mm.sequences.quantizeNoteSequence(this.sequence, 4)
    this.player.start(quantizedSequence)
    console.log(quantizedSequence)
  }

  public convertToEditMode(){
    if(!this.editModeVisible){
      this.editp5 = new p5(this.editSketch, document.getElementById("canvEditMode"))
      this.createINoteSequence()
      let el = document.getElementById("canvEditMode")
      this.createGrid(el.clientWidth, el.clientHeight, this.editp5)
      this.displayMelody(this.sequence, this.editp5)
      this.editModeVisible = true
    }
  }

  public delete(){
    console.log(this.sequence)
    
    this.drawp5.remove()
    this.drawp5 = new p5(this.sketch)
    if(this.editp5 != null){
      this.editp5.remove()
    }
    if(this.continuedp5 != null){
      this.continuedp5.remove()
    }
    this.sequence = {}
    this.resultArray = []
    console.log(this.sequence)
    this.melodyCreated = false
    this.state = "prediction"
    this.deleteOption = false
    this.continueVisible = "not"
    this.editModeVisible = false
  }

  public continueSeq(){
    if(this.continueVisible != "visible"){
    this.continueVisible = "loading"
      this.continuedp5 = new p5(this.editSketch, document.getElementById("continuedSeq"))
      let el = document.getElementById("canvEditMode")
      this.createGrid(el.clientWidth, el.clientHeight, this.continuedp5)
      let qSequence = mm.sequences.quantizeNoteSequence(this.sequence, 4)
      this.mRNN.initialize().then(()=>{
        this.mRNN.continueSequence(qSequence, 60, 1.1).then((seq)=>{
          console.log(seq + " q: " + qSequence)
          this.displayMelody(seq, this.continuedp5)
          this.continueVisible = "visible";
        })
      })
    }
  }
}
