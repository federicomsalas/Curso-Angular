import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

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
        if(sesion.admin){        
          return true;
        }else{          
          alert("No tiene permisos");
          this.router.navigate(['inicio']);
          return false;
        }
      })
    );
  }


  
}
