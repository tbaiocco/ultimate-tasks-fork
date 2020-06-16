import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: ':taskId',
        component: TaskListComponent,
      },
    ],
  },
  {
    path: 'create',
    component: TaskFormComponent,
  },
  {
    path: 'task/:taskId',
    component: TaskListComponent,
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
