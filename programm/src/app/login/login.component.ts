import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { RouterModule, Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public email: string = "" 
  public passw:string = ""

  public user: User;

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

  passwortFormControl = new FormControl('', [
    Validators.required
  ]);

  createJSON() {

    if(this.email != "" && this.validateEmail(this.email) && this.passw != "" && this.passw.length >= 8) {
      const json: String = '{"email":"' + this.email + '","password":"' + this.passw + '"}';
      
    }

   
  }

  login(){
    
    console.log(this.email + " " +this.passw)
   this.user.email = this.email
    this.user.password = this.passw
    this.httpService.login(this.user).subscribe((res)=>{ this.router.navigate(['/profil'])})
  }

  validateEmail(email:any) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
