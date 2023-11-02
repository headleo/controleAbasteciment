import { Component, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent {
  tasks: any[] = [];

  constructor(private router: Router, private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Verifica se existe um parâmetro na rota
    this.route.params.subscribe(params => {
      if (params['titulo']) {
        const tituloParam = params['titulo'];
        this.tasks = this.taskService.getTasksByTitulo(tituloParam);
      } else {
        this.tasks = this.taskService.getTasks(); 
      }
    });
  }

  deleteTask(taskToDelete: any) {
    const index = this.tasks.indexOf(taskToDelete);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.taskService.deleteTask(taskToDelete); 
    }
  }

  
}
