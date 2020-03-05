import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Icons } from './icons.enum';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private matIconRegistry:MatIconRegistry, private domSanitizer:DomSanitizer) {}

  public customIcons(){
    this.loadIcons(Object.values(Icons), '../../assets/icons')
  }
  loadIcons(val: Icons[], iconUrl:String) {
    val.forEach(key =>{
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`))
    })
  }
}
