import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { FormsModule } from '@angular/forms';
import { Task } from './task';
import { TasksResponse } from './tasks-response';
import { injectDispatch, injectSelector } from '@reduxjs/angular-redux';
import { RootState } from './store';
import { setLoading, storeTasks, addTask, deleteTask, updateTask } from './store/task-slice';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [CommonModule, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  newTask: string = '';

  tasks = injectSelector((state: RootState) => state.task.tasks);
  isLoading = injectSelector((state: RootState) => state.task.loading);
  
  dispatch = injectDispatch();
  
  storeTasks = storeTasks;
  setLoading = setLoading;
  addTask = addTask;
  updateTask = updateTask;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.dispatch(setLoading(true));
    this.taskService.getTasks().subscribe((todos: TasksResponse) => {
      this.dispatch(storeTasks(todos));
    });
  }

  onAddTask() {
    this.dispatch(setLoading(true));
    this.taskService.addTask({title: this.newTask, completed: false}).subscribe((response) => {
      console.log(response);
      this.dispatch(addTask(response));
      this.newTask = '';
    });
  }

  onRemoveTask(id: number) {
    this.dispatch(setLoading(true));
    this.taskService.removeTasks(id).subscribe(() => {
      this.dispatch(deleteTask(id));
    });
  }

  onCompleteTask(e: any, id: number) {
    this.dispatch(setLoading(true));
    this.taskService.setCompleteStatus(id, e.target.checked).subscribe((response) => {
      this.dispatch(updateTask({id, task: response}));
    });
  }

}
