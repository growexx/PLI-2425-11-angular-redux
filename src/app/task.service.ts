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
    return this.http.get<TasksResponse>('https://dummyjson.com/todos');
  }
}
