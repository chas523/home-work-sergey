import { Component, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Employees } from '../employees-table/models/employees-table';
import { EmployeesStore } from '../employees-table/store/employees-table.store';

@Component({
  selector: 'app-employees-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatError,
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './employees-dialog.component.html',
  styleUrl: './employees-dialog.component.scss',
})
export class EmployeesDialogComponent {
  employeeForm: FormGroup;
  isEditing: boolean;

  readonly store = inject(EmployeesStore);

  constructor(
    public dialogRef: MatDialogRef<EmployeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employees | null, // Employee data if editing
    private fb: FormBuilder
  ) {
    this.isEditing = !!data; // Check if data exists to determine if editing

    this.employeeForm = this.fb.group({
      id: [
        { value: data?.id || '', disabled: this.isEditing },
        [Validators.required, this.uniqueIdValidator.bind(this)],
      ],
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      age: [data?.age || '', Validators.required],
      city: [data?.city || '', Validators.required],
      street: [data?.street || '', Validators.required],
      department: [data?.department || '', Validators.required],
    });
    if (!this.isEditing) {
      this.employeeForm.patchValue({
        id: this.generateUniqueId(),
      });
    }
  }
  uniqueIdValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const id = control.value;
    const isDuplicate = this.store
      .employees()
      .some(
        (employee) =>
          employee.id === id && (!this.data || employee.id !== this.data.id)
      );
    return isDuplicate ? { notUnique: true } : null;
  }

  private generateUniqueId(): string {
    const employees = this.store.employees();
    const lastId =
      employees.length > 0
        ? Math.max(...employees.map((e) => parseInt(e.id, 10)))
        : 0;
    return (lastId + 1).toString();
  }

  saveEmployee() {
    if (this.employeeForm.valid) {
      let employeeData;
      if (this.isEditing) {
        employeeData = {
          ...this.employeeForm.value,
          id: this.data?.id,
        } as Employees; // Ensure `id` is always included when editing
      } else {
        employeeData = this.employeeForm.value;
      }

      if (this.isEditing) {
        console.log(employeeData);
        this.store.updateEmployee(employeeData, this.dialogRef);
      } else {
        this.store.addEmployee(employeeData, this.dialogRef);
      }
    }
  }
}
