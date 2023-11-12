import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [];

  //Cadastrar uma entidade no Web Storage.
  constructor() {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage() {
    const tasksString = localStorage.getItem('tasks');
    if (tasksString) {
      this.tasks = JSON.parse(tasksString);
    }
  }

  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  addTask(task: Task) {
    const taskWithId = { ...task, id: uuidv4() };
    this.tasks.push(taskWithId); 
    this.saveTasksToLocalStorage();
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
      this.saveTasksToLocalStorage();
    }
  }

  getTaskById(taskId: string): Task | undefined {
    return this.tasks.find(task => task.id === taskId);
  }

  updateTask(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.saveTasksToLocalStorage();
    }
  }
  
}
