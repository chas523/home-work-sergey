import { Employees } from '../models/employees-table';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { EmployeesTableService } from '../services/employees-table.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';

interface EmployeesState {
  employees: Employees[];
  isLoading: boolean;
  error: any | null;
}

const initialState: EmployeesState = {
  employees: [],
  isLoading: false,
  error: null,
};

export const EmployeesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, employeesService = inject(EmployeesTableService)) => ({
    loadEmployees: () => {
      patchState(store, { isLoading: true, error: null });
      employeesService
        .getAllEmployees()
        .pipe(
          tap((employees) => {
            patchState(store, { employees, isLoading: false });
          }),
          catchError((err) => {
            patchState(store, { isLoading: false, error: err });
            return of([]);
          })
        )
        .subscribe();
    },
    
    /**
     * Adds a new employee.
     * @param {Employees} employee - The employee to add.
     * @param {any} [dialog] - Optional dialog reference to close after adding the employee.
     */
    addEmployee: (employee: Employees, dialog?: any) => {
      patchState(store, { isLoading: true, error: null });
      employeesService
        .addEmployee(employee)
        .pipe(
          tap((response) => {
            patchState(store, { employees: [...response] });
            if (dialog) dialog.close();
          }),
          catchError((err) => {
            patchState(store, { error: err });
            return of([]);
          }),
          finalize(() => {
            patchState(store, { isLoading: false });
            console.log(store.employees());
          })
        )
        .subscribe();
    },

    /**
     * Updates an existing employee.
     * @param {Employees} employee - The employee to update.
     * @param {any} [dialog] - Optional dialog reference to close after updating the employee.
     */    
    updateEmployee: (employee: Employees, dialog?: any) => {
      patchState(store, { isLoading: true, error: null });
      employeesService
        .updateEmployee(employee)
        .pipe(
          tap((response) => {
            patchState(store, { employees: response });
            if (dialog) dialog.close();
          }),
          catchError((err) => {
            patchState(store, { error: err });
            return of([]);
          }),
          finalize(() => {
            patchState(store, { isLoading: false });
          })
        )
        .subscribe();
    },

    /**
     * Removes an employee by their ID.
     * @param {string} employeeId - The ID of the employee to remove.
     */
    removeEmployee: (employeeId: string) => {
      patchState(store, { isLoading: true, error: null });
      employeesService
        .removeEmployee(employeeId)
        .pipe(
          tap((updatedEmployees) => {
            patchState(store, { employees: updatedEmployees });
          }),
          finalize(() => {
            patchState(store, { isLoading: false });
          })
        )
        .subscribe();
    },
  }))
);
