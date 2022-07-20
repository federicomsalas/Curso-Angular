import { Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document
  ) { }

  public ngOnInit() {

    let script_hero = this._renderer2.createElement('script');
    script_hero.type = 'text/javascript';
    script_hero.src = "assets/js/typed.min.js";
  
    this._renderer2.appendChild(this._document.body, script_hero);

    let script_counter = this._renderer2.createElement('script');
    script_counter.type = 'text/javascript';
    script_counter.src = "assets/js/purecounter.js";
  
    this._renderer2.appendChild(this._document.body, script_counter);

    let script_waypoint = this._renderer2.createElement('script');
    script_waypoint.type = 'text/javascript';
    script_waypoint.src = "assets/js/noframework.waypoints.js";
  
    this._renderer2.appendChild(this._document.body, script_waypoint);    

    let script_skills = this._renderer2.createElement('script');
    script_skills.type = 'text/javascript';
    script_skills.src = "assets/js/skills.js";
  
    this._renderer2.appendChild(this._document.body, script_skills);    

  }


}
