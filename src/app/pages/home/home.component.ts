import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/common/TaskModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  tasks: TaskModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addTask(event: any): void {
    const input = event.target as HTMLInputElement;
    const taskText = input.value.trim();
    if (taskText) {
      let task: TaskModel = {
        id: this.tasks.length + 1,
        title: taskText,
        completed: false,
        dueDate: new Date()
      };
      this.tasks.push(task);
      input.value = '';
    }
  }

  getPendingTasksCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

}
