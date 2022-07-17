import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

    tema: Tema = new Tema()
    listaTemas: Tema[]

  ngOnInit() {

    if(environment.token == '') {
      this.alertas.showAlertDanger('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas()

  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=> {
      this.tema = resp 
      this.alertas.showAlertInfo('Tema cadastrado com sucesso!')
      this.findAllTemas()
      this.tema = new Tema()
    })
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

}
