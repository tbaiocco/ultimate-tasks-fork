import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent],
  exports: [TaskListComponent, TaskFormComponent],
  imports: [CommonModule, RouterModule],
})
export class TasksModule {}
