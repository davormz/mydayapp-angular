import { Component, Input } from '@angular/core';
import { TaskModel } from 'src/app/common/TaskModel';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})
export class TodoTaskComponent {

  @Input()
  task!: TaskModel;

}
