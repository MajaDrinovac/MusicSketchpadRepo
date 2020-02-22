import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  @Input() colorBtnEdit 
  @Input() colorBtnGrid
  @Input() melodyCreated
  @Input() instruments
  @Output() toEditMode = new EventEmitter()
  @Output() toDrawMode = new EventEmitter()
  @Output() played = new EventEmitter()
  @Output() changed = new EventEmitter<Number>()
  @Output() opened = new EventEmitter()

  public instrumentNr

  //public colorBtnEdit = "accent"
  //public colorBtnGrid = ""

  constructor() {}

  ngOnInit() {}

  onOpenDialog(){
    this.opened.emit()
  }

  public onChange(value){
    this.changed.emit(value)
  }

  public onConvertToEditMode(){
    this.toEditMode.emit()
  }

  public onConvertToDrawMode(){
    this.toDrawMode.emit()
  }

  public onPlayed(){
    this.played.emit()
  }
}
