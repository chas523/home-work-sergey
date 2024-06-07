import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { Employees } from '../models/employees-table';
import { MockApiService } from '../../../common/services/mock-api.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesTableService {
  /**
   * Creates an instance of EmployeesTableService.
   * @param {MockApiService} mockApi - The mock API service to interact with.
   */
  constructor(private mockApi: MockApiService) {}

  /**
   * Fetches all employees from the mock API.
   * @returns {Observable<Employees[]>} An observable containing the list of employees.
   */
  getAllEmployees(): Observable<Employees[]> {
    return of(this.mockApi.get());
  }

  /**
   * Adds a new employee to the mock API.
   * @param {Employees} employee - The employee to add.
   * @returns {Observable<Employees[]>} An observable containing the updated list of employees.
   */
  addEmployee(employee: Employees): Observable<Employees[]> {
    return of(this.mockApi.add(employee));
  }

  /**
   * Updates an existing employee in the mock API.
   * @param {Employees} employee - The employee to update.
   * @returns {Observable<Employees[]>} An observable containing the updated list of employees.
   */
  updateEmployee(employee: Employees): Observable<Employees[]> {
    return of(this.mockApi.update(employee));
  }

  /**
   * Removes an employee from the mock API by their ID.
   * @param {string} employeeId - The ID of the employee to remove.
   * @returns {Observable<Employees[]>} An observable containing the updated list of employees.
   */
  removeEmployee(employeeId: string): Observable<Employees[]> {
    return of(this.mockApi.delete(employeeId));
  }
}
