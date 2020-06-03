import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as p5 from 'p5';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
declare let ml5:any

@Component({
  selector: 'app-edit-melody',
  templateUrl: './edit-melody.component.html',
  styleUrls: ['./edit-melody.component.scss']
})
export class EditMelodyComponent implements OnInit {

  private edit:p5
  public tracks
  private state = ""
  public color = ""
  private trackNum = 0
  private model
  private width
  private height

  constructor(public data:DataService, private dialog:MatDialog) {
    this.tracks = this.data.editMelody.melody
    console.log(this.tracks)
    this.color = this.data.editMelody.color_instrument[0].color
    console.log(this.color)
    let options = {
      inputs: ['x', 'y'],
      output: ['label'],
      task: 'classification'
    }
    this.model = ml5.neuralNetwork(options)
    this.model.load("../assets/model/model.json", this.modelLoaded)
  }

  private modelLoaded(){
    console.log("model loaded")
  }
   

  ngOnInit() {
   //this.editp5 = new p5(this.sketch)
  }

  ngAfterViewInit(){
    this.edit = new p5(this.sketch)
    //this.displayMelodyImage()
    this.displayMelodyPoints(false)
    console.log("beim laden width, height: " + document.getElementById("editCanv").clientWidth + ", " + document.getElementById("editCanv").clientHeight)
  }

  save(){
    const dialogConfig = new MatDialogConfig()
    this.dialog.open(SaveDialogComponent, dialogConfig)
  }

  private displayMelodyPoints(pop){
    if(pop){
      this.data.editMelody.points[this.trackNum].pop()
    }
    this.edit.clear()
    let index = 0
    let p
    for(let i = 0; i < this.data.editMelody.points.length; i++){
      this.data.editMelody.points[i].forEach(point => {
        if(index == 0){
          p = point
          
        }else{
          this.edit.stroke(this.data.editMelody.color_instrument[i].color)
          this.edit.strokeWeight(20)
          this.edit.line(p.x, p.y, point.x, point.y)
          p = point
        }
        index++
      });
      index = 0
    }
  }

  onResize(event){
   let newWidth = event.target.innerWidth*0.63
   let newHeight = event.target.innerHeight*0.77
   //prozent ausrechnen
   console.log("rechnung: (" +newWidth + "/" + this.width+")")
    let wProzent = (newWidth / this.width)
    let hProzent = (newHeight / this.height)
   let points = this.data.editMelody.points
   points.forEach(track => {
    //array von {x,y}
    track.forEach(pair => {
      //prozent von punkt x,y
      pair.x *= wProzent
      pair.y *= hProzent
    });
   });
    this.edit.clear()
    delete this.edit
    document.getElementById("canv").removeChild(document.getElementById("editCanv"))
    this.edit = new p5(this.sketch)
    this.displayMelodyPoints(false)
  }

  displayTrack(num){
   // this.testPoints[this.tracks.length].pop()
   if(this.state == "prediction"){
    this.data.editMelody.points[this.trackNum].pop()
   }
    this.state = "prediction"
    this.trackNum = num
    let index = 0
    this.edit.clear()
    let p
    //this.edit = new p5(this.sketch)
      this.data.editMelody.points[num].forEach(point => {
        if(index == 0){
          p = point
        }else{
          this.edit.stroke(this.data.editMelody.color_instrument[num].color)
          this.edit.strokeWeight(20)
          this.edit.line(p.x, p.y, point.x, point.y)
          p = point
        }
        index++
      });
    
  }

  private displayMelodyImage(){
    let canv = <HTMLCanvasElement> document.getElementById("editCanv")
    let cvx = canv.getContext("2d")
    let img = new Image()
    img.src = this.data.editMelody.img
    canv.width = img.width
    canv.height = img.height
    cvx.drawImage(img,0,0)
    console.log(img.width + ", " + canv.width)
    //cvx.drawImage(this.data.editMelody.img, 0, 0)
    //console.log(this.data.editMelody.img)
  }
  
  private sketch = (s) =>{
    s.setup = () =>{
      //let canv = s.createCanvas(document.getElementById("canv").clientWidth-1, document.getElementById("canv").clientHeight-1).id("editCanv").parent(document.getElementById("canv"))
      this.width = window.innerWidth * 0.63
      this.height = window.innerHeight * 0.77
      let canv = s.createCanvas(this.width,this.height).id("editCanv").parent(document.getElementById("canv"))
    }
/*
    s.draw = ()=>{
      s.background(255,0,0)
    }
*/
    //predict x/y to note
    s.mouseDragged = ()=>{
      if(this.state == "prediction"){
        let inputs = {
          x: s.mouseX,
          y: s.mouseY
        }
        this.data.editMelody.points[this.trackNum].push(inputs)
        //this.testPoints[this.trackNum].push(inputs)
        this.model.classify(inputs, (err, results)=>{
          this.drawLine(err, results)
        })
      }
    }
/*
    s.mouseReleased = async () =>{
        if(this.state == "prediction"){
          this.melodyCreated = true
          this.deleteOption = true
          const response = await (await fetch('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus/soundfont.json')).json()
          this.instruments = Object.values(response.instruments);
        }
    } */
  }
  private drawLine(err, results){
    if (err) {
      console.log(err)
      return
    }
    //console.log(this.color)
    this.edit.strokeWeight(20)
    this.edit.stroke(this.data.editMelody.color_instrument[this.trackNum].color)
    this.edit.line(this.edit.mouseX, this.edit.mouseY, this.edit.pmouseX, this.edit.pmouseY)
    //this.resultArray.push(results[0].label);
  }
}