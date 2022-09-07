import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService
  , private router: Router)
  {

  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{

    return this.authService.obtenerSesion().pipe(
      map((sesion: Usuario) => {
        if(sesion.admin){
          return true;
        }else{
          alert("No tiene permisos");
          return false;
        }
      })
    );


  };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.obtenerSesion().pipe(
      map((sesion: Usuario) => {
        try {
        if(sesion.id){
          localStorage.setItem('SESSION', JSON.stringify(sesion));
          return true;
        }else{
          this.router.navigate(['login']);
          return false;
        }
        }
        catch {
          this.router.navigate(['login']);
          return false;          
        }
      })
    );
  }


}
