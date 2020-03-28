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

    

  }

}
