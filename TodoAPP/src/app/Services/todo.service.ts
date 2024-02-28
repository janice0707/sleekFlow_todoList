import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { Todo } from '../Models/todo.model';
import { Observable, map, tap } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http : HttpClient) { }
  result: Todo[] = [];
  
  get(){
    const baseParams = new HttpParams().set('filter', 'all');

    this.http.get('/api/config', {
      params: baseParams.set('details', 'enabled'),
    }).subscribe(config => {
      
      
    });
  }

  getTodo(id: number){
    return this.http.get<Todo>('/api/todo/'+id);
  }

  addTodo(formData : any){
    //  console.log(formData)
    return this.http.post('/api/todo', formData);
  }

  editTodo(formData : any){
    // console.log(formData)

    return this.http.put('/api/todo', formData);
  }

  deleteTodo(id: number){
    // console.log(formData)

    return this.http.delete('/api/todo/' + id);
  }

  getTodos(){
    return this.http.get<Todo[]>('/api/todo');
  }

  getFilterTodos(formData: any){
    // const baseParams = new HttpParams().set('filter', 'all');

    // let params = new HttpParams();
    // params = params.append('var1', '1');
    // params = params.append('var2', '2');
    

    return this.http.get<Todo[]>('/api/todo', {params: formData});
  }

}
