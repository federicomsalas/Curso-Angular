import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document,
    private authService: AuthService
  ) { }

  public ngOnInit() {

    let script_hero = this._renderer2.createElement('script');
    script_hero.type = 'text/javascript';
    script_hero.src = "assets/js/nav.js";
  
    this._renderer2.appendChild(this._document.body, script_hero);

  }

  cerrarSesion()
  {
    this.authService.cerrarSesion();
  }

}

