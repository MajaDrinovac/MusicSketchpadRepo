import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email:string = ""
  public passwort:string = ""

  constructor() { }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwortFormControl = new FormControl('', [
    Validators.required
  ]);

  createJSON() {
    const email: String = (<HTMLInputElement>document.getElementById("emailAdresse")).value;
    const passwort: String = (<HTMLInputElement>document.getElementById("passwort")).value;

    if(email != "" && this.validateEmail(email) && passwort != "" && passwort.length >= 8) {
      const json: String = '{"email":"' + email + '","password":"' + passwort + '"}';

      alert(json);

    }

   
  }

  validateEmail(email:any) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
