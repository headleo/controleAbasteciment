import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [];

  constructor(private http: HttpClient) {
    this.loadTasksFromApi();
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

  // uso do observable
  loadTasksFromApi() {
    this.http.get<Task[]>('http://localhost:3000/tasks')
      .pipe(
        catchError(error => {
          console.error('Erro ao obter abastecimentos da API:', error);
          return throwError(error);
        })
      )
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  addTask(task: Task) {
    const taskWithId = { ...task, id: uuidv4() };
    this.tasks.push(taskWithId);
    this.saveTasksToLocalStorage();
    this.createTaskOnApi(taskWithId);
  }

  createTaskOnApi(task: Task): Observable<any> {
    return this.http.post('http://localhost:3000/tasks', task)
      .pipe(
        catchError(error => {
          console.error('Erro ao cadastrar tarefa na API:', error);
          return throwError(error);
        })
      );
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksByTitulo(placa: string): Task[] {
    return this.tasks.filter(task => task.placa === placa);
  }

  deleteTask(taskId: string) {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage();
      this.deleteTaskOnApi(taskId);
    }
  }

  deleteTaskOnApi(taskId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/tasks/${taskId}`)
      .pipe(
        catchError(error => {
          console.error('Erro ao deletar tarefa na API:', error);
          return throwError(error);
        })
      );
  }

  getTaskById(taskId: string): Task | undefined {
    return this.tasks.find(task => task.id === taskId);
  }

  updateTask(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.saveTasksToLocalStorage();
      this.updateTaskOnApi(task);
    }
  }

  updateTaskOnApi(task: Task): Observable<any> {
    return this.http.put(`http://localhost:3000/tasks/${task.id}`, task)
      .pipe(
        catchError(error => {
          console.error('Erro ao atualizar tarefa na API:', error);
          return throwError(error);
        })
      );
  }
}
