import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoFormComponent } from '../shared/todo-form/todo-form.component';
import { TodoService } from '../../Services/todo.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoStatus } from '../../Helpers/constant';

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [TodoFormComponent, ReactiveFormsModule],
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.scss'
})
export class TodoEditComponent {
  // @Input() isShown: boolean=false;
  // @Input() id : number = 0;
  @Input() editModalInput = { isTriggerEditShown: false, editId: 0 };
  @Output() newIsShown = new EventEmitter<boolean>();

  todoForm:any;

  //isShown: boolean = false;

  toggleModal(){
    this.editModalInput.isTriggerEditShown=!this.editModalInput.isTriggerEditShown;
    this.newIsShown.emit(this.editModalInput.isTriggerEditShown);
  }

  constructor(private todoService: TodoService){

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

  submitForm(){
    this.todoService.editTodo(this.todoForm.value).subscribe({
      next: (result) => {
        alert("edit succesfully");
        this.editModalInput.isTriggerEditShown=false;
        this.newIsShown.emit(this.editModalInput.isTriggerEditShown);
      },
      error: (error) => {

      },
    });
  }

  // getTodoForm(values){
  //   this.formData=values;
  // }

  deleteTodo(){
    this.todoService.deleteTodo(this.editModalInput.editId).subscribe({
      next: (result) => {
        alert("delete succesfully");
        this.editModalInput.isTriggerEditShown=false;
        this.newIsShown.emit(this.editModalInput.isTriggerEditShown);
      },
      error: (error) => {

      },
    });
  }

  getTodo(){
    
    this.todoService.getTodo(this.editModalInput.editId).subscribe({
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
