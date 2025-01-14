import { Component, Input, ViewChild, ElementRef, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { TaskModel } from 'src/app/common/TaskModel';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})
export class TodoTaskComponent implements AfterViewChecked{

  @Input()
  task!: TaskModel;

  @Output()
  taskUpdated = new EventEmitter<TaskModel>();

  @ViewChild('inputElement') inputElement!: ElementRef;

  ngAfterViewChecked(): void {
    if (this.task.edit && this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  toggleTaskCompletion(): void {
    this.task.completed = !this.task.completed;
    this.taskUpdated.emit(this.task);
  }

  enableEditMode(): void {
    this.task.edit = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 0);
  }

  updateTaskTitle(event: any): void {
    const input = event.target as HTMLInputElement;
    const taskText = input.value.trim();
    if (taskText) {
      this.task.title = taskText;
      this.disableEditMode();
      this.taskUpdated.emit(this.task);
    }
  }

  disableEditMode(): void {
    this.task.edit = false;
    this.taskUpdated.emit(this.task);
  }

}
