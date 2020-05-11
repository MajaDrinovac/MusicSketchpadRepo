import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  constructor(public router: Router, private httpService: HttpService, private data: DataService) { }

  ngOnInit() {
    this.httpService.findAllMelodies().subscribe((res) => { this.melodies = res; this.displayMelodies() })

  }

}
