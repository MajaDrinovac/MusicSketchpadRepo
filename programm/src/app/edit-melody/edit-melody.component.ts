import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-melody',
  templateUrl: './edit-melody.component.html',
  styleUrls: ['./edit-melody.component.scss']
})
export class EditMelodyComponent implements OnInit {

  constructor(public data:DataService) {
   }
   

  ngOnInit() {
  }

  

}
