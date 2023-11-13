import { Component, OnInit, AfterViewInit   } from '@angular/core';
import { TaskService } from '../task.service';
import * as M from 'materialize-css';
import { Task } from '../task.model'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit , AfterViewInit {

  ngAfterViewInit() {
    M.updateTextFields();
  }

  
  ngOnInit() {
  
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      if (taskId) {
        const task = this.taskService.getTaskById(taskId);
        if (task) {
          this.task = task;
        } else {
          M.toast({
            html: 'Abastecimento não encontrada!',
            classes: 'red lighten-2 white-text'
          });
        }
      }
    });
  }

  task: Task = {
    placa: '',
    veiculo: '',
    veiculoFirma: '',
    dataAbastecimento: '',
    combustivel: ''
  };

  errors: Record<string, string> = {};

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  limparCampos() {
    this.task = {
      placa: '',
      veiculo: '',
      veiculoFirma: '',
      dataAbastecimento: '',
      combustivel: ''
    };
    this.errors = {};
  }

  validateTitulo() {
    if (!this.task.placa) {
      this.errors['placa'] = 'Placa é obrigatório';
    } else {
      this.errors['placa'] = '';
    }
  }

  validateDescricao() {
    if (!this.task.veiculo) {
      this.errors['veiculo'] = 'Veiculo é obrigatória';
    } else {
      this.errors['veiculo'] = '';
    }
  }

  validateVeiculoFirma() {
    if (!this.task.veiculoFirma.match(/^[A-Za-z\s]+$/)) {
      this.errors['veiculoFirma'] = 'VeiculoFirma deve conter apenas letras e espaços';
    } else {
      this.errors['veiculoFirma'] = '';
    }
  }

  validateDataEntrega() {
    if (!this.task.dataAbastecimento.match(/^\d{4}-\d{2}-\d{2}$/)) {
      this.errors['dataAbastecimento'] = 'Data de Abastecimento deve estar no formato yyyy-mm-dd';
    } else {
      this.errors['dataAbastecimento'] = '';
    }
  }

  validateCombustivel() {
    if (!this.task.combustivel.match(/^[A-Za-z\s]+$/)) {
      this.errors['combustivel'] = 'Combustivel deve conter apenas letras e espaços';
    } else {
      this.errors['combustivel'] = '';
    }
  }

  hasErrors(): boolean {
    return Object.values(this.errors).some(error => error !== '');
  }


  onSubmit() {
    //Validar campos do formulário com Expressões Regulares e apresentar os erros.
    this.validateTitulo();
    this.validateDescricao();
    this.validateVeiculoFirma();
    this.validateDataEntrega();
    this.validateCombustivel();
  
    if (!this.hasErrors()) {
      if (this.task.id) {
        // Atualizar tarefa existente
        this.taskService.updateTask(this.task);
        M.toast({
          html: 'Abastecimento atualizada com sucesso!',
          classes: 'green lighten-2 white-text'
        });
      } else {
        // Cadastrar nova tarefa
        this.taskService.addTask(this.task);
        M.toast({
          html: 'Abastecimento cadastrado com sucesso! Verifique na tela de listagem.',
          classes: 'green lighten-2 white-text'
        });
      }
      this.limparCampos();
    } else {
      M.toast({
        html: 'Por favor, corrija os erros no formulário antes de enviar.',
        classes: 'red lighten-2 white-text'
      });
    }
  }
}
