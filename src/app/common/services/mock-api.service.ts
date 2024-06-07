import { Injectable } from '@angular/core';
import { Employees } from '../../components/employees-table/models/employees-table';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  private employees: Employees[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      age: 28,
      city: 'New York',
      street: '5th Avenue',
      department: 'Sales',
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      age: 34,
      city: 'Los Angeles',
      street: 'Sunset Boulevard',
      department: 'Marketing',
    },
    {
      id: '3',
      firstName: 'Alice',
      lastName: 'Johnson',
      age: 45,
      city: 'Chicago',
      street: 'Michigan Avenue',
      department: 'Human Resources',
    },
    {
      id: '4',
      firstName: 'Bob',
      lastName: 'Brown',
      age: 22,
      city: 'Houston',
      street: 'Main Street',
      department: 'Development',
    },
    {
      id: '5',
      firstName: 'Carol',
      lastName: 'Davis',
      age: 30,
      city: 'Phoenix',
      street: 'Camelback Road',
      department: 'Finance',
    },
    {
      id: '6',
      firstName: 'David',
      lastName: 'Wilson',
      age: 37,
      city: 'Philadelphia',
      street: 'Market Street',
      department: 'Operations',
    },
    {
      id: '7',
      firstName: 'Eve',
      lastName: 'Martinez',
      age: 29,
      city: 'San Antonio',
      street: 'River Walk',
      department: 'Support',
    },
    {
      id: '8',
      firstName: 'Frank',
      lastName: 'Taylor',
      age: 50,
      city: 'San Diego',
      street: 'Gaslamp Quarter',
      department: 'Research',
    },
    {
      id: '9',
      firstName: 'Grace',
      lastName: 'Anderson',
      age: 33,
      city: 'Dallas',
      street: 'Elm Street',
      department: 'IT',
    },
    {
      id: '10',
      firstName: 'Henry',
      lastName: 'Thomas',
      age: 41,
      city: 'San Jose',
      street: 'Santa Clara Street',
      department: 'Engineering',
    },
  ];

  get() {
    return this.employees;
  }

  add(item: Employees) {
    this.employees.push(item);
    return this.employees;
  }

  update(updatedEmployee: Employees) {
    this.employees = this.employees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    return this.employees;
  }

  delete(id: string) {
    this.employees = this.employees.filter((item) => item.id !== id);
    return this.employees;
  }
}
