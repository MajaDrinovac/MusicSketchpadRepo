import { Injectable } from '@angular/core';
import { Melody } from './melody';
import { INoteSequence } from '@magenta/music/es6';
import { HttpService } from './http.service';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public httpService: HttpService, public router:Router) { }

  public melody: Array<Object>;
  public editMelody: Melody
  public edit: Boolean = false
  public user: User = new User('MajaDrino', 'majadrino@gmail.com', '?')
  public eingeloggt: Boolean



  datenspeichern(email, password){
    console.log(email + " " + password)
    this.user.email = email
    this.user.password = password
    

    console.log(this.user.email + " " + this.user.password)
   
  }
}

