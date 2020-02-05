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
  @Output() toEditMode = new EventEmitter()
  @Output() toDrawMode = new EventEmitter()
  @Output() played = new EventEmitter()

  //public colorBtnEdit = "accent"
  //public colorBtnGrid = ""

  constructor() { }

  ngOnInit() {
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
