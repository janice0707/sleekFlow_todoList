import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from '../../Services/todo.service';
import { TodoFormComponent } from '../shared/todo-form/todo-form.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoStatus } from '../../Helpers/constant';

@Component({
  selector: 'app-todo-add',
  standalone: true,
  imports: [TodoFormComponent, ReactiveFormsModule],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss',
  animations:[
    // trigger('todoAddTrigger', [
    //   transition(':enter', [
    //     style({ opacity: 0 }),
    //     animate('200ms', style({ opacity: 1 })),
    //   ]),
    //   transition(':leave', [
    //     animate('300ms', style({ opacity: 0 }))
    //   ])
    // ]),

    // trigger('todoAddTrigger', [
    //   state('open', style({
    //     height: '200px',
    //     opacity: 1,
    //     backgroundColor: 'yellow'
    //   })),
    //   state('closed', style({
    //     height: '100px',
    //     opacity: 0.8,
    //     backgroundColor: 'blue'
    //   })),
    //   transition('open => closed', [
    //     animate('5s')
    //   ]),
    //   transition('closed => open', [
    //     animate('5.5s')
    //   ])
    // ]),
  ]
})
export class TodoAddComponent {
  @Input() isShown: boolean=false;
  @Output() newIsShown = new EventEmitter<boolean>();

  // formData:any;
  todoForm:any;

  constructor(private todoService : TodoService){
    
  }
  

  toggleModal(){
    this.isShown=!this.isShown;
    this.newIsShown.emit(this.isShown);
  }

  submitForm(){

    this.todoService.addTodo(this.todoForm.value).subscribe({
      next: (result) => {
        alert("added succesfully");
        this.isShown=false;
        this.newIsShown.emit(this.isShown);
      },
      error: (error) => {

      },
    });
   
  }

  // getTodoForm(values){
  //   this.formData=values;
  // }

  updateStatus(value){
    this.todoForm.patchValue({
      status: value
    });
  }

  ngOnInit(){
    this.todoForm = new FormGroup({
      name: new FormControl('', Validators.required ),
      description: new FormControl('', Validators.maxLength(200)),
      dueDate: new FormControl(''),
      status: new FormControl(TodoStatus.NotStarted),
      uniqueId: new FormControl(),
    });
  }

}
