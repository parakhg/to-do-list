import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TasksComponent } from './list/tasks/tasks.component';

const routes: Routes = [
  { path: 'lists', component: ListComponent},
  { path: 'tasks', component: TasksComponent},
  { path: '**', redirectTo: '/lists' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
