import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from './model/employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    // tslint:disable-next-line: deprecation
    this.employeeService.getEmplyee().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(empyolee: Employee, mode: string): void {
    const container = document.getElementById('main-container'); // idを振ったdiv要素を取得
    const button = document.createElement('button'); // ボタンを作る
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal');
    }

    if (mode === 'edit'){
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    if (mode === 'delete'){
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    container.appendChild(button);
    button.click();

    // switchがこんな書き方で書けるそうなので後で試す
    // const result: string | number | string[] = when(hoge)
    // .on((v: number) => v === 1, (): string   => "A")
    // .on((v: number) => v === 2, (): boolean  => 100)
    // .on((v: number) => v === 3, (): string[] => ["aaa", "bbb"])
    // .otherwise((): string => "default");
  }

  public onAddEmployee(addForm: NgForm): void {
    // formを消している。
    document.getElementById('add-employee-form').click();

    // tslint:disable-next-line: deprecation
    this.employeeService.addEmplyee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
