import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() dashboardMenue: String = "#221C29";
  @Input() bibliothekMenue: String = "#221C29";

  constructor() { }

  ngOnInit() {
    if (this.getWebServerRelativeUrl() == "/dashboard") {
      this.dashboardMenue = "rgb(78, 63, 94)";
      this.bibliothekMenue = "#221C29";
    } else if (this.getWebServerRelativeUrl() == "/bibliothek") {
      this.dashboardMenue = "#221C29";
      this.bibliothekMenue = "rgb(78, 63, 94)";
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
