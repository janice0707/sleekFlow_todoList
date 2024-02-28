import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../../Services/todo.service';
import { TodoStatus } from '../../../Helpers/constant';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  @Input() id : number = 0;
  @Output() todoFormValues = new EventEmitter<any>();

  todoForm:any;

  constructor(private todoService : TodoService){}

  
 ngOnInit(){

  this.todoForm = new FormGroup({
    name: new FormControl('', Validators.required ),
    description: new FormControl('', Validators.maxLength(200)),
    dueDate: new FormControl(''),
    status: new FormControl(TodoStatus.NotStarted),
    uniqueId: new FormControl(),
  });

  for (const field in this.todoForm.controls) { 
    this.todoForm.controls[field].valueChanges.subscribe(value => {
      this.todoFormValues.emit(this.todoForm.value);
    });
  }

  
  if(this.id > 0 ){
    this.getTodo();
  }
 }

 

  getTodo(){
    this.todoService.getTodo(this.id).subscribe({
      next: (result) => {
        this.todoForm.patchValue({
          name: result.Name, 
          description: result.Description,
          dueDate: result.DueDate,
          status: result.Status,
          uniqueId: result.UniqueID
        });
      },
      error: (error) => {

      },
    });
  }

  updateStatus(value){
    this.todoForm.patchValue({
      status: value
    });
  }
 


}
