import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, merge, of, Subject } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import {
  Task,
  TasksDataService,
} from '../tasks-data-service/tasks-data.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  public tasks: Task[] = [];
  public searchInput$ = new Subject<string>();

  @ViewChild('inputField', { static: true })
  public inputField: ElementRef<HTMLInputElement>;

  constructor(
    private tasksService: TasksDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  private searchTasks() {
    const urlSearch = this.activatedRoute.snapshot.queryParamMap.get('search');
    this.inputField.nativeElement.value = urlSearch;
    console.log(urlSearch);

    const search$ = merge(
      this.searchInput$.pipe(
        tap((v) => console.log(v)),
        filter((v) => v.length > 2 || v.length === 0),
        debounceTime(500)
      ),
      of(urlSearch ? urlSearch : '')
    );

    search$.subscribe((term) => {
      this.router.navigate(['.'], {
        queryParams: {
          search: term,
        },
      });
    });

    combineLatest([this.tasksService.tasks$, search$])
      .pipe(
        map(([tasks, term]) => {
          return tasks.filter((task) => task.title.includes(term));
        })
      )
      .subscribe((tasks) => (this.tasks = tasks));
  }

  ngOnInit() {
    this.searchTasks();

    this.tasksService.loadTasks();
  }

  public newSearchInput(value: string) {
    this.searchInput$.next(value);
  }

  public delete(task: Task) {
    this.tasksService.deleteTask(task);
  }
}
