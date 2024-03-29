import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar() {
    this.authService.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin)=>{

      this.usuarioLogin = resp      

      environment.token = this.usuarioLogin.token
      environment.id = this.usuarioLogin.id
      environment.foto = this.usuarioLogin.foto
      environment.nome = this.usuarioLogin.nome
      environment.tipo = this.usuarioLogin.tipo

      console.log(environment.foto)
      console.log(environment.id)
      console.log(environment.nome)
      console.log(environment.token)
      console.log(environment.tipo)

      this.router.navigate(['/inicio'])
    }, erro =>{
      if(erro.status == 401) {
        this.alertas.showAlertDanger('Usuário ou senha estão incorretos!')
      }
    })
  }

}
