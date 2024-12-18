import { Component, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { TaskModel } from 'src/app/common/TaskModel';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})
export class TodoTaskComponent implements AfterViewChecked{

  @Input()
  task!: TaskModel;

  @ViewChild('input') inputElement!: ElementRef;

  ngAfterViewChecked(): void {
    if (this.task.edit && this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  toggleTaskCompletion(): void {
    this.task.completed = !this.task.completed;
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
    }
  }

  disableEditMode(): void {
    this.task.edit = false;
  }

}
