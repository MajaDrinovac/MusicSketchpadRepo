import { Injectable } from '@angular/core';
import { Melody } from './melody';
import { INoteSequence } from '@magenta/music/es6';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  public editMelody:Melody
  public edit:Boolean = false
}
