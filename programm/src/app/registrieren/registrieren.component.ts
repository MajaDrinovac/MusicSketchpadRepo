import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { HttpService } from '../http.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.scss']
})
export class RegistrierenComponent implements OnInit {

  public benutzername:string = ""
  public email:string = ""
  public passw1:string = ""
  public passw2:string = ""
  
  constructor(public router:Router,private httpService:HttpService) { }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  benutzernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  passwort1FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  passwort2FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  createJson() {
    console.log("hallo");
    if (this.benutzername != "" && this.benutzername.length >= 6 && this.email != "" && this.validateEmail(this.email) && this.passw1 != "" && this.passw1.length >= 8 && this.passw2 != "" && this.passw2.length >= 8 && this.passw1 == this.passw2) {
      let user = new User(this.benutzername, this.email, this.passw1)
      console.log(user)
      this.httpService.insertUser(user).subscribe((res)=>{ this.router.navigate(['/profil']) }
    )} else if (this.benutzername != "" && this.benutzername.length >= 6 && this.email != "" && this.validateEmail(this.email) && this.passw1 != "" && this.passw1.length >= 8 && this.passw2 != "" && this.passw2.length >= 8){
      const fehler: String = (<HTMLInputElement>document.getElementById("errorPasswort")).innerText = "Passwörter stimmen nicht überein!";
    }

  }

  validateEmail(email: any) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
