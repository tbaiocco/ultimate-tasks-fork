import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/infrastructure/config/config.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | Date;
  importance: 'low' | 'normal' | 'high';
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TasksDataService {
  public tasks: Task[] = [];
  public tasks$ = new Subject<Task[]>();

  constructor(private config: ConfigService, private http: HttpClient) {
  }

  public loadTasks() {

  }

  public createTask(task: Task) {
    this.http.post<Task>(`${this.config.api}/tasks`, task)
      .subscribe(newTask => {
        this.tasks = [...this.tasks, newTask];
        this.notify();
      })
  }

  public updateTask(task: Task) {
    this.http.put<Task>(`${this.config.api}/tasks`, task)
      .subscribe(updatedTask => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        this.tasks.splice(index, 1, updatedTask);
        this.notify();
      });
  }

  public deleteTask(task: Task) {
    this.http.delete(`${this.config.api}/tasks/${task.id}`)
      .subscribe(_ => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks.splice(index, 1);
        this.notify();
      })
  }

  private notify() {
    this.tasks$.next(this.tasks);
  }
}
