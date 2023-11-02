import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  pesquisaText: string = ''; 
  constructor(private router: Router) {}
  
  pesquisarAbastecimento() {
  
    this.router.navigate(['/lista-abastecimentos', this.pesquisaText]);
    this.pesquisaText = '';
  }
}
