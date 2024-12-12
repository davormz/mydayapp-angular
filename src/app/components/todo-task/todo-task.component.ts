import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { TaskModel } from 'src/app/common/TaskModel';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})
export class TodoTaskComponent {

  @Input()
  task!: TaskModel;

  // @ViewChild('input') inputElement!: ElementRef;

  toggleTaskCompletion(): void {
    this.task.completed = !this.task.completed;
  }

  enableEditMode(): void {
    this.task.edit = true;
    // input.focus();
  }

  updateTaskTitle(event: any): void {
    const input = event.target as HTMLInputElement;
    const taskText = input.value.trim();
    if (taskText) {
      this.task.title = taskText;
      this.task.edit = false;
    }
  }

  disableEditMode(): void {
    this.task.edit = false;
  }

}
