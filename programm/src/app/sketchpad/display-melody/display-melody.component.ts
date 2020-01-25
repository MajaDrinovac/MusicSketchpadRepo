import { Component, OnInit, Input } from '@angular/core';
import * as p5 from 'p5'

@Component({
  selector: 'display-melody',
  templateUrl: './display-melody.component.html',
  styleUrls: ['./display-melody.component.scss']
})
export class DisplayMelodyComponent{
  @Input() melody
  private editp5:p5
  //private canvElement = document.getElementsByClassName("canvEdit")[0]
  private canvElement = document.getElementById("canvEdit")
  constructor() { 
  }

  ngOnInit(){
    this.editp5 = new p5(this.editSketch, this.canvElement)
    //alert(this.canvElement.clientHeight)
  }

  private editSketch = (s)=>{
    s.setup = () =>{
      
      //let canv = s.createCanvas(document.getElementsByClassName("content")[0].clientWidth/2, document.getElementsByClassName("content")[0].clientHeight*2/3).parent(document.getElementById("canvEditMode"))
      //let canv = s.createCanvas(this.canvElement.clientWidth-1, this.canvElement.clientHeight-1)
      let canv = s.createCanvas(100, 100)
      s.background(0, 0, 0)
      //this.createDictionary(this.canvElement.clientHeight)
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
}
