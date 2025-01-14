import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/app/common/TaskModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  tasks: TaskModel[] = [];
  filteredTasks: TaskModel[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();

    this.route.url.subscribe(() => {
      this.filterTasks();
    });
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
      this.filterTasks();
      input.value = '';
    }
  }

  getPendingTasksCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

  getCompletedTasksCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  clearCompletedTasks(): void {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.saveTasksToLocalStorage();
    this.filterTasks();
  }

  private saveTasksToLocalStorage(): void {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }

  private loadTasksFromLocalStorage(): void {
    const tasks = localStorage.getItem('mydayapp-angular');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
    this.filterTasks();
  }

  updateTask(updatedTask: TaskModel): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.saveTasksToLocalStorage();
      this.filterTasks();
    }
  }

  private filterTasks(): void {
    const url = this.route.snapshot.url.map(segment => segment.path).join('/');
    if (url === 'pending') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    } else if (url === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else {
      this.filteredTasks = this.tasks;
    }
  }

}
