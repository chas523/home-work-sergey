import { Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
