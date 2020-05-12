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

    if(this.email != "" && this.validateEmail(this.email) && this.passwort != "" && this.passwort.length >= 8) {
      const json: String = '{"email":"' + this.email + '","password":"' + this.passwort + '"}';
      
    }

   
  }

  validateEmail(email:any) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
