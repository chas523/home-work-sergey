import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import {
  MatMenu,
  MatMenuContent,
  MatMenuItem,
  MatMenuTrigger,
} from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesDialogComponent } from '../employees-dialog/employees-dialog.component';
import { Employees } from './models/employees-table';
import { EmployeesStore } from './store/employees-table.store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatMenu,
    MatMenuItem,
    MatMenuContent,
    MatProgressSpinner,
  ],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesTableComponent implements OnInit {
  readonly employeesStore = inject(EmployeesStore);

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'age',
    'city',
    'street',
    'department',
    'edit',
  ];

  constructor(public dialog: MatDialog) {
    effect(() => {
      console.log('happ');
    });
  }

  ngOnInit() {
    this.employeesStore.loadEmployees();
  }

  remove(id: string) {
    this.employeesStore.removeEmployee(id);
  }


  openDialog(employee?: Employees): void {
    // Make employee optional
    const dialogRef = this.dialog.open(EmployeesDialogComponent, {
      width: '400px', // Set a reasonable width for the dialog
      data: employee, // Pass employee data if editing, otherwise null for adding
    });
  }
}
