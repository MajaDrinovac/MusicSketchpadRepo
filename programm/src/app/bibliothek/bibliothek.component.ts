import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-bibliothek',
  templateUrl: './bibliothek.component.html',
  styleUrls: ['./bibliothek.component.scss']
})
export class BibliothekComponent implements OnInit {
  public melodies
  constructor(private httpService:HttpService) { }

  ngOnInit() {
    //this.melodies = this.httpService.findAllMelodies()
  }

  displayMelodies(){
    this.httpService.findAllMelodies().subscribe((res)=>{console.log(res)})
  }
}
