import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService
  , private router: Router)
  {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.obtenerSesion().pipe(
      map((sesion: Usuario) => {
        if(sesion.id){        
          this.router.navigate(['inicio']);
          return true;
        }else{          
          return false;
        }
      })
    );
  }
  
}
