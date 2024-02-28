import { Component, ViewChild } from '@angular/core';
import { TodoAddComponent } from '../todo-add/todo-add.component';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../Services/todo.service';
import { Todo } from '../../Models/todo.model';
import { NEVER, Observable, of } from 'rxjs';
import { TodoStatus } from '../../Helpers/constant';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoAddComponent, TodoEditComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  isTriggerAddShown : boolean = false;
  isShowFilter : boolean = false;
  isShowSort : boolean = false;
  notStartedList: Todo[] = [];
  inProgressList: Todo[] = [];
  completedList: Todo[] = [];
  editModalInput =  { isTriggerEditShown: false, editId: 0 }; 
  todoFilterForm:any

  @ViewChild(TodoEditComponent) todoEdit: TodoEditComponent;
  
  constructor(private todoService: TodoService) {
    
  }

  ngAfterViewInit() {
   }

  toggleAddModal(){
    this.isTriggerAddShown=!this.isTriggerAddShown;
  }

  getNewIsAddShown(event : any){
    this.isTriggerAddShown=event;
    this.getTodoList();
  }

  editClick(id: number){
    this.editModalInput.isTriggerEditShown=!this.editModalInput.isTriggerEditShown;
    this.editModalInput.editId=id;
    this.todoEdit.getTodo();
    // this.isTriggerEditShown=!this.isTriggerEditShown;
    // this.editId =id;
  }

  getNewIsEditShown(event : any){
    // this.isTriggerEditShown=event;
    this.editModalInput.isTriggerEditShown=event;
    this.getTodoList();
  }

  toggleFilterShow(){
    this.isShowSort=false;
    this.isShowFilter=!this.isShowFilter;
  }

  toggleSortShow(){
    this.isShowFilter=false;
    this.isShowSort=!this.isShowSort;
  }

  getTodoList(){

    this.todoService.getTodos().subscribe({
      next: (result) => {
        this.notStartedList = result.filter(w => w.Status==TodoStatus.NotStarted);
        this.inProgressList = result.filter(w => w.Status==TodoStatus.InProgress);
        this.completedList = result.filter(w => w.Status==TodoStatus.Completed);
      },
      error: (error) => {

      },
    });

  }


  ngOnInit(){
    this.getTodoList();

    this.todoFilterForm = new FormGroup({
      name: new FormControl(''),
      dueDate: new FormControl(''),
      status_notStarted: new FormControl(''),
      status_completed: new FormControl(''),
      status_inProgress: new FormControl(''),
      status: new FormArray([])
    });
  }

  onCheckChange(event){
    const formArray: FormArray = this.todoFilterForm.get('status') as FormArray;

    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));

      if(event.target.value == "NotStarted"){
        this.todoFilterForm.controls['status_notStarted'].setValue(true);
      }
      if(event.target.value == "InProgress"){
        this.todoFilterForm.controls['status_inProgress'].setValue(true);
      }
      if(event.target.value == "Completed"){
        this.todoFilterForm.controls['status_completed'].setValue(true);
      }
    }else{

      if(event.target.value == "NotStarted"){
        this.todoFilterForm.controls['status_notStarted'].setValue(false);
      }
      if(event.target.value == "InProgress"){
        this.todoFilterForm.controls['status_inProgress'].setValue(false);
      }
      if(event.target.value == "Completed"){
        this.todoFilterForm.controls['status_completed'].setValue(false);
      }

      let i: number = 0;

      formArray.controls.forEach((ctrl) => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
    
  }

  onFilterClick(){
     //console.log(this.todoFilterForm.value)
    this.todoService.getFilterTodos(this.todoFilterForm.value).subscribe({
      next: (result) => {
        this.notStartedList = result.filter(w => w.Status==TodoStatus.NotStarted);
        this.inProgressList = result.filter(w => w.Status==TodoStatus.InProgress);
        this.completedList = result.filter(w => w.Status==TodoStatus.Completed);

        this.isShowFilter=false;
      },
      error: (error) => {

      },
    });
  }

  onFilterReset(){
    this.todoFilterForm.reset();
  }

  onFilterClose(){
    this.isShowFilter=false;
  }

}

