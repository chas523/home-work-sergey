import { Component } from '@angular/core';
import { EmployeesTableComponent } from '../../components/employees-table/employees-table.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [EmployeesTableComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {}
