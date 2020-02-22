import { Component, OnInit, Input, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { ColorEvent } from 'ngx-color';
import {EventEmitter} from '@angular/core'

declare let ml5:any

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  private model
  public instruments
  public grayColor = "#555"
  private colorPrev

  constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { 
    let options = {
      inputs: ['r', 'g', 'b'],
      output: ['label'],
      task: 'classification'
    }
    this.model = ml5.neuralNetwork(options)
    this.model.load("../assets/model_color/model.json", this.modelLoaded)
  }
  private modelLoaded(){
    console.log("model loaded")
  }
  ngOnInit() {
    this.instruments = this.data.instruments
    this.color = this.data.color
    this.colorPrev = this.data.color
  }

  public color = "#fff"
  public fontColor = ""
  instrumentDialogVisible:Boolean = false
  public isClicked

  //public colorPicker
public fontColorPrediction(){
  //this.convertHex2Rgb(this.color)
  return this.fontColor
}

public convertHex2Rgb(hex){
  let value = hex.replace('#','');
  let r = parseInt(value.substring(0,2), 16);
  let g = parseInt(value.substring(2,4), 16);
  let b = parseInt(value.substring(4,6), 16);
  //this.state = "prediction"
  let inputs= {
    r: r,
    g: g,
    b: b
  }
  //console.log(inputs)
  this.model.classify(inputs, (err, results)=>{
    if(err){
      console.error(err)
      return;
    }
    if(results[0].label == "white"){
      this.fontColor = '#eee'
    }else{
      this.fontColor = '#222'
    }
  })
}

  public next(){
    //this.dialogRef.close()
    this.instrumentDialogVisible = true
    //alert(this.colorPicker)
  }
  public save(){
    //this.dialogRef.close("pizza")
    this.dialogRef.close(this.color)
  }

  public close(){
    this.dialogRef.close(this.colorPrev)
  }

  public onChange(value){

  }
  public chooseInstrument(value){
    this.isClicked = value
  }

  public handleChange($event: ColorEvent){
    this.color = $event.color.hex
  }
  public handleMouseOver($event){
    console.log($event)
  }

  public back(){
    this.instrumentDialogVisible = false
  }
}
