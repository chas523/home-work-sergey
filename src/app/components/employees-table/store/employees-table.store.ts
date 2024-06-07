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
