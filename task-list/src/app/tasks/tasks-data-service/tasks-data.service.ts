import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigService } from 'src/app/infrastructure/config/config.service';

export interface Task {
  id?: string;
  title: string;
  description: string;
  dueDate: string | Date;
  importance: 'low' | 'normal' | 'high';
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TasksDataService {
  public tasks: Task[] = [];
  public tasks$ = new Subject<Task[]>();

  private internalTasks$ = new ReplaySubject<Task[]>(1);

  constructor(private config: ConfigService, private http: HttpClient) {
    this.internalTasks$.subscribe((tasks) => this.tasks$.next(tasks));
  }

  public loadTasks() {
    this.http
      .get<Task[]>(`${this.config.api}/tasks`)
      .subscribe((tasks) => this.tasks$.next(tasks));
  }

  public getTask(id: string) {
    return this.http.get<Task>(`${this.config.api}/tasks/${id}`);
  }

  public saveTask(task: Task) {
    if (task.id) {
      return this.updateTask(task);
    } else {
      return this.createTask(task);
    }
  }

  public createTask(task: Task) {
    return this.http.post<Task>(`${this.config.api}/tasks`, task);
  }

  public updateTask(task: Task) {
    return this.http.put<Task>(`${this.config.api}/tasks`, task);
  }

  public deleteTask(task: Task) {
    const deleted$ = this.http
      .delete(`${this.config.api}/tasks/${task.id}`)
      .pipe(
        tap(console.log),
        map(() => task.id),
        catchError(() => of(task.id))
      );

    combineLatest([this.internalTasks$, deleted$])
      .pipe(
        tap(console.log),
        map(([tasks, id]) => tasks.filter((t) => t.id !== id))
      )
      .subscribe((tasks) => this.tasks$.next(tasks));
  }

  private notify() {
    this.tasks$.next(this.tasks);
  }
}
