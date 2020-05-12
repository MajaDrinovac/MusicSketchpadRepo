import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public email:string = ""
  public passw:string = ""

  constructor(public httpService : HttpService, public router:Router) { }

  ngOnInit() {
    console.log("test")
    this.httpService.getUser().subscribe(value => console.log(value), 
    error => console.log('from sub ' + error), 
    () => console.log('completed'))

  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  createJSON() {
    const email: String = (<HTMLInputElement>document.getElementById("emailAdresse")).value;
    const passwort: String = (<HTMLInputElement>document.getElementById("passwort")).value;

    if(email != "" && this.validateEmail(email) && passwort != "" && passwort.length >= 8) {
      const json: String = '{"email":"' + email + '","password":"' + passwort + '"}';

      alert(json);

    }

   
  }

  login(){
    this.httpService.getUser().subscribe((res)=>{ this.router.navigate(['/profil'])})
  }

  validateEmail(email:any) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
