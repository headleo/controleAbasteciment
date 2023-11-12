import { Component } from '@angular/core';
import * as M from 'materialize-css'
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showWelcomeModal = true;

  closeWelcomeModal() {
    this.showWelcomeModal = false;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});
