import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() dashboardMenue: String = "#607D8B";
  @Input() bibliothekMenue: String = "#607D8B";

  constructor() { }

  ngOnInit() {
    if (this.getWebServerRelativeUrl() == "/dashboard") {
      this.dashboardMenue = "rgb(108, 140, 156)";
      this.bibliothekMenue = "";
    } else if (this.getWebServerRelativeUrl() == "/bibliothek") {
      this.dashboardMenue = "";
      this.bibliothekMenue = "rgb(108, 140, 156)";
    } else {
      this.dashboardMenue = "";
      this.bibliothekMenue = "";
    }
  }

  public getWebServerRelativeUrl(): string {
    if (window
      && "location" in window
      && "pathname" in window.location) {
      return window.location.pathname.replace(/\/$/, "");
    }
    return null;
  }

}
