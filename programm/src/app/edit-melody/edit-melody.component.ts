import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as p5 from 'p5';

@Component({
  selector: 'app-edit-melody',
  templateUrl: './edit-melody.component.html',
  styleUrls: ['./edit-melody.component.scss']
})
export class EditMelodyComponent implements OnInit {

  private editp5:p5

  constructor(public data:DataService) {
  }
   

  ngOnInit() {
   // this.editp5 = new p5(this.sketch)
  }

  ngAfterViewInit(){
    this.editp5 = new p5(this.sketch)
    //this.displayMelodyImage()
    this.displayMelodyPoints()
  }

  private displayMelodyPoints(){
    
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
      let canv = s.createCanvas(document.getElementById("canv").clientWidth-1, document.getElementById("canv").clientHeight-1).id("editCanv").parent(document.getElementById("canv"))
      s.background(255, 255, 255)
    }

    //predict x/y to note
    /*s.mouseDragged = ()=>{
      if(this.state == "prediction"){
        let inputs = {
          x: s.mouseX,
          y: s.mouseY
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
    } */
  }

}
