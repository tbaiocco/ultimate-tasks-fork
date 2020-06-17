import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Task,
  TasksDataService,
} from '../tasks-data-service/tasks-data.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  public taskForm = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.maxLength(200)]),
    dueDate: new FormControl(null),
    importance: new FormControl('low'),
    done: new FormControl(false),
    assignees: new FormArray([
      new FormControl('a person'),
      new FormControl('other guy'),
    ]),
  });

  constructor(
    private dataService: TasksDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const taskId = this.activatedRoute.snapshot.paramMap.get('taskId');
    if (taskId) {
      this.dataService
        .getTask(taskId)
        .subscribe((task) => this.taskForm.patchValue(task));
    }
  }

  get assignees(): FormArray {
    return this.taskForm.get('assignees') as FormArray;
  }

  public addAssignee() {
    this.assignees.push(new FormControl('New guy'));
  }

  submit(task: Task) {
    this.dataService.saveTask(task).subscribe(
      () => {
        this.router.navigate(['/tasks']);
      },
      (err) => console.log(err)
    );
    // if (task.id) {
    //   this.dataService.updateTask(task).subscribe(
    //     () => {
    //       this.router.navigate(['/tasks']);
    //     },
    //     (err) => console.log(err)
    //   );
    // } else {
    //   this.dataService.createTask(task).subscribe(
    //     () => {
    //       this.router.navigate(['/tasks']);
    //     },
    //     (err) => console.log(err)
    //   );
    // }
  }
}
