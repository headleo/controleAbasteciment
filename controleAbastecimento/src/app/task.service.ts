import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [];

  constructor() {
    this.loadTasksFromApi();
  }

  async loadTasksFromApi() {
    try {
      const response = await fetch('http://localhost:3000/tasks'); 
      if (response.ok) {
        const tasks = await response.json();
        this.tasks = tasks;
      } else {
        console.error('Erro ao obter abastecimentos da API:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao obter abastecimentos da API:', error);
    }
  }

  addTask(task: Task) {
    const taskWithId = { ...task, id: uuidv4() };
    this.tasks.push(taskWithId);
    this.createTaskOnApi(taskWithId); // Chama a função para criar a abastecimento na API
  }

  async createTaskOnApi(task: Task) {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      if (!response.ok) {
        console.error('Erro ao cadastrar abastecimento na API:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar abastecimento na API:', error);
    }
  }

  getTasks() {
    return this.tasks;
  }

  getTasksByTitulo(placa: string) {
    return this.tasks.filter(task => task.placa === placa);
  }

  deleteTask(taskId: string) {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.deleteTaskOnApi(taskId); // Chama a função para deletar a abastecimento da API
    }
  }

  async deleteTaskOnApi(taskId: string) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        console.error('Erro ao deletar abastecimento na API:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar abastecimento na API:', error);
    }
  }

  getTaskById(taskId: string): Task | undefined {
    return this.tasks.find(task => task.id === taskId);
  }

  updateTask(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.updateTaskOnApi(task); // Chama a função para atualizar a abastecimento na API
    }
  }

  async updateTaskOnApi(task: Task) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      if (!response.ok) {
        console.error('Erro ao atualizar abastecimento na API:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar abastecimento na API:', error);
    }
  }
}
