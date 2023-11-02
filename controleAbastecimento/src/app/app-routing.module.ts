import { TaskListComponent } from './task-list/task-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from './task-form/task-form.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  //Mapear componentes à rotas no módulo de rotas.
  { path: 'cadastro-abastecimentos', component: TaskFormComponent } ,
  { path: 'lista-abastecimentos', component: TaskListComponent },
  
  //Passar dados entre componentes que representam diferentes telas via parâmetros de rotas. 
  { path: 'lista-abastecimentos/:placa', component: TaskListComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
