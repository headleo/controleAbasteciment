import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-welcome-modal',
  template: `
   <div class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h4 class="modal-title">{{ welcomeMessage }}</h4>
      <button class="modal-close btn" (click)="closeModal()"><i class="material-icons">close</i></button>
    </div>
  </div>
</div>

  `,
  styles: [`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    }
  `]
})
export class WelcomeModalComponent {

  //Passar dados via hierarquia de componentes, ou seja, usando @Input ou @Output -----------//
  @Input() show: boolean = false;
  @Input() welcomeMessage: string;
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    this.welcomeMessage = "Bem-vindo ao gerenciador de Abastecimentos";
  }

  closeModal() {
    this.modalClosed.emit();
  }
}

