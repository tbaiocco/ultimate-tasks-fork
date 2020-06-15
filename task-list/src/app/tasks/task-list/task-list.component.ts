import { Component, OnInit } from '@angular/core';
import { TasksDataService, Task } from '../tasks-data-service/tasks-data.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  public tasks: Task[] = [];
  constructor(private tasksService: TasksDataService) {
    this.tasksService.tasks$.subscribe(tasks => this.tasks = tasks)
  }

  ngOnInit() {
    this.tasksService.loadTasks();
  }

}
