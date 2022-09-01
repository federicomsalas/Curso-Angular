import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../shared/css/content.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private authService: AuthService
  ) {    

    this.formLogin = fb.group({
      usuario: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required]),
    });    

   }

  ngOnInit(): void {
  }

  onEnviar(event: Event) {
    event.preventDefault();
    const usuario = this.formLogin.value.usuario;
    const contrasena = this.formLogin.value.contrasena;
    this.authService
      .IniciarSesion(usuario, contrasena)
      .subscribe((data: Usuario) => {
        if (data) {
          this.authService.establecerSesion(data);
        } else {
          alert("Error de credenciales");
        }
      });
  }  

}
