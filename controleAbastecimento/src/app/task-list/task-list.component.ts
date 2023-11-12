import { Component, OnInit  } from '@angular/core';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../task.model'; 

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent  implements OnInit{
  tasks: any[] = [];


  constructor(private router: Router, private taskService: TaskService, private route: ActivatedRoute) {}

ngOnInit(): void {
  // Verifica se existe um parâmetro na rota
  this.route.params.subscribe(params => {
    if (params['placa']) {
      const placaParam = params['placa'];
      console.log("Placa da pesquisa:", placaParam);
      this.tasks = this.taskService.getTasksByTitulo(placaParam);
    } else {
      this.tasks = this.taskService.getTasks(); 
    }    
  });
}

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(taskToDelete: any) {
    this.taskService.deleteTask(taskToDelete.id);
    this.loadTasks();
  }

  editTask(task: Task) {
    const taskCopy = { ...task }; // Clona a abastecimento para edição
    this.router.navigate(['/task-form', task.id], { state: { task: taskCopy } });
  }
  
  
}
