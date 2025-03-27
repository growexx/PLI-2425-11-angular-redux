import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksResponse } from './tasks-response';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  getTasks(): Observable<TasksResponse> {
    return this.http.get<TasksResponse>('https://jsonplaceholder.typicode.com/todos');
  }

  addTask(reqObj: any): Observable<TasksResponse> {
    return this.http.post<TasksResponse>('https://jsonplaceholder.typicode.com/todos', reqObj);
  }
  
  removeTasks(id: number): Observable<TasksResponse> {
    return this.http.delete<TasksResponse>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  setCompleteStatus(id: number, completed: boolean): Observable<TasksResponse> {
    return this.http.patch<TasksResponse>(`https://jsonplaceholder.typicode.com/todos/${id}`, { completed });
  }

}
