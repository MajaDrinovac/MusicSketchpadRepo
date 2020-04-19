import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-melody-title',
  templateUrl: './melody-title.component.html',
  styleUrls: ['./melody-title.component.scss']
})
export class MelodyTitleComponent implements OnInit {
  public title = "" 
  constructor(private dialogRef: MatDialogRef<MelodyTitleComponent>) { }

  ngOnInit() {
  }
  closeDialog(){
    this.dialogRef.close(this.title)
  }
}
