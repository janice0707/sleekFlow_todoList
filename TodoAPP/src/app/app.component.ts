import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './Todo/todo-list/todo-list.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TodoAPP';

  isShowMenu : boolean = false;

  showMenu(){
    this.isShowMenu=!this.isShowMenu;
  }

  ngOnInit(): void {
    // initFlowbite();
  }
}
