import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.scss']
})
export class RegistrierenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  createJson() {
    const benutzer: String = document.getElementById("benutzername").value;
    const email: String = document.getElementById("email").value;
    const passwort1: String = document.getElementById("passwort1").value;
    const passwort2: String = document.getElementById("passwort2").value;

    if(benutzer != "" && benutzer.length >=6 && email != "" && this.validateEmail(email) && passwort1 != "" && passwort1.length >= 8 && passwort2 != "" && passwort2.length >= 8 && passwort1 == passwort2) {

      const json: String = '{"benutzername":"' + benutzer + '","email":"' + email + '","passwort":"' + passwort1 + '"}';

      alert(json);

    }


  }

  validateEmail(email:any) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
