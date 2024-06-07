import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Employees } from '../models/employees-table';
import { MockApiService } from '../../../common/services/mock-api.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesTableService {
  constructor(private mockApi: MockApiService) {}

  getAllEmployees(): Observable<Employees[]> {
    return of(this.mockApi.get());
  }

  addEmployee(employee: Employees): Observable<Employees[]> {
    return of(this.mockApi.add(employee));
  }

  updateEmployee(employee: Employees): Observable<Employees[]> {
    return of(this.mockApi.update(employee));
  }

  removeEmployee(employeeId: string): Observable<Employees[]> {
    return of(this.mockApi.delete(employeeId));
  }
}
