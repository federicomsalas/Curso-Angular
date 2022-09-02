import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { usuarioReducer } from '../../state/reducers/usuario.reducer';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { crearSesion } from '../../state/actions/usuario.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup = new FormGroup({
    usuario:  new FormControl("Gloria76"),
    contrasena: new FormControl('')
  })
  constructor(
    private usuarioService: UsuarioService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    const usuario = this.formulario.value.usuario;
    const contrasena =  this.formulario.value.contrasena;

    this.usuarioService.login(usuario, contrasena).subscribe((usuario) =>
    {
      if (usuario)
      {
        this.store.dispatch(crearSesion({usuario: usuario}));
        this.router.navigate(['']);        
      }
      else
      {
        alert("Credenciales incorrectas");
      }
    }
  }

}
