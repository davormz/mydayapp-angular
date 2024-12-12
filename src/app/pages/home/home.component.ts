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
    this.loadTasksFromLocalStorage();
  }

  addTask(event: any): void {
    const input = event.target as HTMLInputElement;
    const taskText = input.value.trim();
    if (taskText) {
      let task: TaskModel = {
        id: this.tasks.length + 1,
        title: taskText,
        completed: false,
        edit: false,
        dueDate: new Date()
      };
      this.tasks.push(task);
      this.saveTasksToLocalStorage();
      input.value = '';
    }
  }

  getPendingTasksCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

  clearCompletedTasks(): void {
    this.tasks = this.tasks.filter(task => !task.completed);
  }

  private saveTasksToLocalStorage(): void {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }

  private loadTasksFromLocalStorage(): void {
    const tasks = localStorage.getItem('mydayapp-angular');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

}
