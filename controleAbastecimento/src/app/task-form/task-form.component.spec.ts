import { Component}from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  task = {
    placa: '',
    veiculo: '',
    veiculoFirma: '',
    dataAbastecimento: '',
    combustivel: ''
  };

  constructor(private taskService: TaskService) {}

  limparCampos() {
    this.task = {
      placa: '',
      veiculo: '',
      veiculoFirma: '',
      dataAbastecimento: '',
      combustivel: ''
    };
  }

  cadastrarAbastecimento() {
    const newTask = {
      placa: this.task.placa,
      veiculo: this.task.veiculo,
      veiculoFirma: this.task.veiculoFirma,
      dataAbastecimento: this.task.dataAbastecimento,
      combustivel: this.task.combustivel
    };

    this.taskService.addTask(newTask);

    M.toast({ html: 'Abastecimento cadastrado com sucesso!', classes: 'green lighten-2 white-text' });

    this.limparCampos();
  }
  
 

}