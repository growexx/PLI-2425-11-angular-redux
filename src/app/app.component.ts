import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { FormsModule } from '@angular/forms';
import { Task } from './task';
import { TasksResponse } from './tasks-response';

@Component({
    selector: 'app-root',
    imports: [FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  tasks: Task[] = [];
  newTask: string = '';
  isLoading: boolean = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe((data: TasksResponse) => {
      this.tasks = data.todos;
      this.isLoading = false;
    });
  }

  onAddTask() {
    this.tasks.unshift({id: this.tasks.length+1, todo: this.newTask, completed: false});
    this.newTask = '';
  }

}
