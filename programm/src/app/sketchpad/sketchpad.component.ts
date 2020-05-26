import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5'
import * as mm from '@magenta/music/es6'
import WebMidi from 'webmidi'
import { MusicRNN, Player, MIDIPlayer, SoundFontPlayer, INoteSequence, BasePlayer } from '@magenta/music/es6'
import { core } from '@angular/compiler';
declare let ml5:any
import {MatDialog, MatDialogConfig} from '@angular/material'
import { DialogComponent } from './dialog/dialog.component';
import { IconService } from '../icon.service';
import { HttpService } from '../http.service';
import { MelodyTitleComponent } from '../melody-title/melody-title.component';
import { Melody } from '../melody';
import { DataService } from '../data.service';

@Component({
  selector: 'sketchpad',
  templateUrl: './sketchpad.component.html',
  styleUrls: ['./sketchpad.component.scss']
})
export class SketchpadComponent implements OnInit {
  public instruments
  private drawp5:p5
  private editp5:p5
  private model
  public state:String= "prediction"
  private targetLabel:String
  private resultArray = []
  private sequence
  private noten_midi_t = {
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
  private noten_midi = {
    C: 59,
    D: 58,
    E: 56,
    F: 54,
    G: 52,
    A: 50,
    B: 48
  }
  private y_notes = {}
  private fillColor = [113, 134, 235]
  public color = "#7186EB"
  public melodyCreated:Boolean = false
  private soundfont_player:SoundFontPlayer
  public deleteOption:Boolean = false
  private mRNN = new MusicRNN("https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn")
  private continuedp5:p5
  private editModeVisible:Boolean = false
  private continueVisible:String = "not"
  private displayArr = []
  public colorBtnEdit = "accent"
  public colorBtnGrid = ""
  public colorWhite = "#fff"
  public instrumentIcons = ['add', 'add', 'add']
  private tracks = []
  private color_instrument = [];
  private testPoints = []
  private width: number;
  private height: number;

  constructor(private data:DataService, private iconService:IconService,private dialog: MatDialog, private httpService:HttpService) { 
    let options = {
      inputs: ['x', 'y'],
      output: ['label'],
      task: 'classification'
    }
    this.testPoints[this.tracks.length] = []
    this.model = ml5.neuralNetwork(options)
    this.model.load("../assets/model/model.json", this.modelLoaded)
    this.targetLabel = "C"
    this.soundfont_player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
  }

  ngOnInit() {
    this.iconService.registerIcons();
    this.instrumentIcons[0] = 'piano'
  }

  ngAfterViewInit(){
    this.drawp5 = new p5(this.sketch)
    this.editp5 = new p5(this.editSketch)
    if(this.data.edit == true){
      this.convertToEditMode()
    }
  }

  onResize(event){
    let newWidth = event.target.innerWidth*0.63
    let newHeight = event.target.innerHeight*0.77
    //prozent ausrechnen
    console.log("rechnung: (" +newWidth + "/" + this.width+")")
      let wProzent = (newWidth / this.width)
      let hProzent = (newHeight / this.height)
    let points = this.testPoints
    points.forEach(track => {
      //array von {x,y}
      track.forEach(pair => {
        //prozent von punkt x,y
        pair.x *= wProzent
        pair.y *= hProzent
      });
    });
      this.drawp5.clear()
      delete this.drawp5
      document.getElementById("canv").removeChild(document.getElementById("drawCanv"))
      this.drawp5 = new p5(this.sketch)
      this.displayMelodyPoints(false)
  }

  private displayMelodyPoints(pop){
    //if(pop){
      //this.data.editMelody.points[this.trackNum].pop()
    //}
    this.drawp5.clear()
    let index = 0
    let p
    for(let i = 0; i < this.testPoints.length; i++){
      this.testPoints[i].forEach(point => {
        if(index == 0){
          p = point
          
        }else{
          console.log(this.color_instrument)
          this.drawp5.stroke(this.color_instrument[i].color)
          this.drawp5.strokeWeight(20)
          this.drawp5.line(p.x, p.y, point.x, point.y)
          p = point
        }
        index++
      });
      index = 0
    }
  }

  public colorFirst = this.color
  public colorSecond = '#888'
  public colorThird = '#888'

  private inst_button = ["piano", "guitar", "drum"]

  openDialog(pos){
    this.state = "color"
    const dialogConfig = new MatDialogConfig();
    this.testPoints[this.tracks.length].pop()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20vw"
    dialogConfig.data = {instruments: this.instruments, color: this.color};

    this.dialog.open(DialogComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.state = "prediction"
      this.color = result.color
      this.color_instrument.push({color: this.color, instrument: this.inst})
      let seq = this.createINoteSequence()
      if(seq.notes.length > 0){
        this.tracks.push(seq)
      }
      this.testPoints[this.tracks.length] = []
      this.inst = result.instrument
      console.log(result.instrument)
      /*if(pos == "second"){
        this.instrumentIcons[1] = 'guitar'
        this.colorSecond = this.color
      }else{
        this.instrumentIcons[2] = "drum"
        this.colorThird = this.color
      }*/
      if(this.inst > 0){
        this.instrumentIcons[pos] = this.inst_button[pos]
      }
    })
  }

  openTitleDialog(){
      this.state = "save"
      this.testPoints[this.tracks.length].pop()
      let seq = this.createINoteSequence()
      this.color_instrument.push({color: this.color, instrument: this.inst})
      this.tracks.push(seq)
      this.dialog.open(MelodyTitleComponent).afterClosed().subscribe(data=>{
      //this.sequence.title = data
      //save Image
      let canv = <HTMLCanvasElement> document.getElementById("drawCanv")
      let img = canv.toDataURL("image/jpeg", 0.1)
      //let img = canv.toDataURL("image/jpeg", 0.1)
      //let link = document.getElementById("link")
      //link.setAttribute('download', 'MintyPaper.png');
      //link.setAttribute('href', img);
      //link.click();
      let melody = new Melody(this.tracks, data, img, this.color_instrument, this.testPoints)
      console.log(melody)
      this.saveMelody(melody)
      
    })
  }

  private modelLoaded(err){
    if(err){
      console.log(err)
      return;
    }else{
      console.log("loaded")
    }
  }

  //create drawsketch
  private sketch = (s) =>{
    s.setup = () =>{
      this.width = window.innerWidth * 0.63
      this.height = window.innerHeight * 0.77
      let canv = s.createCanvas(this.width, this.height).id("drawCanv").parent(document.getElementById("canv"))
      s.background(255,255,255)
    }

    //predict x/y to note
    s.mouseDragged = ()=>{
      if(this.state == "prediction"){
        let inputs = {
          x: s.mouseX,
          y: s.mouseY
        }
        if(this.color_instrument.length == 0){
          this.color_instrument.push({color: this.color, instrument: this.inst})
        }
        this.testPoints[this.tracks.length].push(inputs)
        this.model.classify(inputs, (err, results)=>{
          this.drawLine(err, results)
        })
      }
    }

    s.mouseReleased = async () =>{
        if(this.state == "prediction"){
          this.melodyCreated = true
          this.deleteOption = true
          const response = await (await fetch('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus/soundfont.json')).json()
          this.instruments = Object.values(response.instruments);
        }
    } 
  }

  public saveMelody(melody){
    console.log(melody.img)
    this.httpService.saveMelody(melody).subscribe((res)=>{console.log(res)});
  }
  
  private whileTraining(epoch, loss){
    console.log(epoch)
  }

  private drawLine(err, results){
    if (err) {
      console.log(err)
      return
    }
    this.drawp5.strokeWeight(this.lineWeight)
    this.drawp5.stroke(this.color)
    this.drawp5.line(this.drawp5.mouseX, this.drawp5.mouseY, this.drawp5.pmouseX, this.drawp5.pmouseY)
    this.resultArray.push(results[0].label);
  }

  private editSketch = (s) =>{
    s.setup = () =>{
      let canvElement = document.getElementById("canv")
      let canv = s.createCanvas(canvElement.clientWidth, canvElement.clientHeight)
      this.createDictionary(canvElement.clientHeight)
    }
  }

  //display melody on sketch
  private displayMelody(seq, p5sketch){
    let durPrev = 0;
    let displaySequence = []
    let qSequence
    this.displayArr = []

    if(mm.sequences.isQuantizedSequence(seq) == true){
      qSequence = seq
    }else{
      qSequence = mm.sequences.quantizeNoteSequence(seq, 4)
    }

    displaySequence = qSequence.notes

    let anz = displaySequence.length
    let getSteps = displaySequence[anz-1].quantizedEndStep
    let res = Math.floor(document.getElementById("canv").clientWidth/getSteps)
    for(let i = 0; i < displaySequence.length; i++){
      let pitch = displaySequence[i].pitch
      let dur = displaySequence[i].quantizedEndStep - displaySequence[i].quantizedStartStep

      p5sketch.fill(0,0,0)
      p5sketch.rect(durPrev*res, this.y_notes[pitch], dur*res, res)
      let x = {xStart: durPrev*res, yStart: this.y_notes[pitch], width: dur*res, height: res, pitch: pitch}
      this.displayArr.push(x)
      //durPrev is offset for the next rect
      durPrev += dur
  }
  }

  //create grid in editmode
  private createGrid(width, height, p5sketch){
    let offset = Math.round(height/7)
    let xOffset = Math.round(width/7)
    let x = Math.round(width/7)
    for(let i = 1; i < 7; i++){
      p5sketch.strokeWeight(1)
      p5sketch.stroke(200)
      p5sketch.line(0, i*offset, width, i*offset)
      p5sketch.line(i*xOffset, 0, i*xOffset, height)
    }
    
  }
  private off
  private createDictionary(height){
    this.off = Math.round(height/7);
    let count = 0
    for(let note in this.noten_midi){
      this.y_notes[this.noten_midi[note]] = this.off*count
      count++
    }
    console.log(this.y_notes)
  }

  //make melody from array of notes
  private createINoteSequence(){
    let countNotes = 0
    let lastNumber = 0
    let notes = 0
    delete this.sequence
    let sequence = {
      title: "",
      instrument: this.inst,
      notes: [],
      totalTime: 0
    }
    for(let i = 0; i < this.resultArray.length; i++){
        if(i != 0){
            if(this.resultArray[i-1] == this.resultArray[i]){
                countNotes++
            }else{
                notes++
                let dur = (countNotes%10)*0.1
                let x = {pitch: this.noten_midi[this.resultArray[i]], startTime: lastNumber, endTime: (lastNumber)+dur}
                lastNumber = lastNumber + dur
                sequence.notes.push(x)
                sequence.totalTime = x.endTime
            }
        }
    }
    let q = this.soundfont_player.loadSamples(sequence)
    sequence.notes.forEach(element => {
      element.program =  this.inst
    });
    this.melodyCreated = true
    return sequence
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
    this.testPoints[this.tracks.length].pop()
    if(!this.editModeVisible){
      let seq = this.createINoteSequence()
      this.tracks.push(seq)
    }
    let players = []
    let index = 0
    this.tracks.forEach(track => {
      players.push(new SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus'))
      players[index].loadSamples(track)
      index++
    });
    for(let i = 0; i < this.tracks.length; i++){
      players[i].start(this.tracks[i])
    }
  }
  private inst = 1
  public changeInstrument(value){
    let seq = this.createINoteSequence()
    this.tracks.push(seq)
    this.inst = value
  }
  private lineWeight = 20
  public changeLineWeight(value){
    this.lineWeight = value
  }

  public openEditMode(){
    this.drawp5.remove()
  }

  public convertToEditMode(){
    if(!this.editModeVisible && this.data.edit == false){
      this.editModeVisible = true
      this.editp5 = new p5(this.editSketch, document.getElementById("canv"))
     // this.createINoteSequence()
      let el = document.getElementById("canv")
      this.createGrid(el.clientWidth, el.clientHeight, this.editp5)
      this.displayMelody(this.sequence, this.editp5)
      this.colorBtnEdit = ""
      this.colorBtnGrid = "accent"
      this.activateEditMode()
    }

    if(this.data.edit == true){
      this.editModeVisible = true
      this.editp5 = new p5(this.editSketch, document.getElementById("canv"))
      let el = document.getElementById("canv")
      this.createGrid(el.clientWidth, el.clientHeight, this.editp5)
      this.displayMelody(this.data.editMelody.melody[0], this.editp5)
      this.colorBtnEdit = ""
      this.colorBtnGrid = "accent"
      this.activateEditMode()
    }
  }

  public convertToDrawMode(){
    if(this.editModeVisible){
      this.delete()
      this.colorBtnEdit = "accent"
      this.colorBtnGrid = ""
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

  public stopMelody(){
    //this.player.stop()
  }

  private canvElement
  public activateEditMode(){
    //this.drawp5.remove()

    this.canvElement= document.getElementById("canv")
    this.editMelody()
  }
  public coord
  private editMelody(){
    let actX
    let  actY
    let draggedRect
    let diffx
    let diffy
    let m = []
    let arrNumber
    let melodyEdited = false

    //when mouse dragged in editMode --> edit notes
    this.editp5.mouseDragged = (event)=>{
      melodyEdited = true
      let x = this.editp5.mouseX
      let y = this.editp5.mouseY
      for(let i = 0; i < this.displayArr.length; i++){
        let rectWidth = this.displayArr[i].xStart + this.displayArr[i].width
        let rectHeight = this.displayArr[i].yStart + this.displayArr[i].height

        if(x > this.displayArr[i].xStart && x < rectWidth && y > this.displayArr[i].yStart && y < rectHeight){
          draggedRect = this.displayArr[i]
          arrNumber = i
          diffx = this.editp5.mouseX - draggedRect.xStart
          diffy = this.editp5.mouseY - draggedRect.yStart
          actX = this.displayArr[i].xStart
          m.push({diffx: diffx, diffy: diffy})
        }
        
      }
    }

    this.editp5.mouseReleased = ()=>{
      if(melodyEdited){
        this.canvElement = document.getElementById("canv")
        actY = this.editp5.mouseY - m[0].diffy

        this.editp5.fill(255)
        this.editp5.stroke(255)
        this.editp5.rect(draggedRect.xStart, draggedRect.yStart, draggedRect.width, draggedRect.height)
        draggedRect.xStart = actX
        draggedRect.yStart = actY

        actY = this.off * Math.round(actY/this.off)
        draggedRect.pitch = this.changeMelody(draggedRect, arrNumber, actY)

        this.displayArr[arrNumber] = draggedRect

        this.sequence.notes[arrNumber].pitch = this.displayArr[arrNumber].pitch
        this.createGrid(this.canvElement.clientWidth, this.canvElement.clientHeight, this.editp5)
        this.displayMelody(this.sequence, this.editp5)
        melodyEdited = false
      }
    }
  }

  private changeMelody(rect, arrNumber, actY){
    let newPitch
    for(let n in this.y_notes){
      if(this.y_notes[n] == actY){
        newPitch = n
      }
    }
    return parseInt(newPitch)
  }

  closeNav() {
    (<HTMLInputElement>document.getElementById("mySidenav")).style.visibility = "hidden";
    //(<HTMLInputElement>document.getElementById("sketchpad")).style.marginLeft = "111px";

  }
}
