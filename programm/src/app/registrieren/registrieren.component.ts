import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { HttpService } from '../http.service';
import { User } from '../user';

@Component({
  selector: 'registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.scss']
})
export class RegistrierenComponent implements OnInit {
  httpService: HttpService;

  public benutzername:string = ""
  public email:string = ""
  public passw1:string = ""
  public passw2:string = ""
  
  constructor() { }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  createJson() {
    /*const benutzer: String = (<HTMLInputElement>document.getElementById("benutzername")).value;
    const email: String = (<HTMLInputElement>document.getElementById("email")).value;
    const passwort1: String = (<HTMLInputElement>document.getElementById("passwort1")).value;
    const passwort2: String = (<HTMLInputElement>document.getElementById("passwort2")).value;
*/


    if (this.benutzername != "" && this.benutzername.length >= 6 && this.email != "" && this.validateEmail(this.email) && this.passw1 != "" && this.passw1.length >= 8 && this.passw2 != "" && this.passw2.length >= 8 && this.passw1 == this.passw2) {
      console.log("validattion‚")
      const json: String = '{"username":"' + this.benutzername + '","email":"' + this.email + '","password":"' + this.passw1 + '"}';
      let user = new User(this.benutzername, this.email, this.passw1)
      //this.postJson(json);
      //this.httpService.insertUser(user).subscribe(()=>{console.log("posted")})
    }


  }

  postJson(json:String) {
    //this.httpService.insertUser(json).subscribe(() => { this.person.push(json) });
  }

  validateEmail(email: any) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
