import { Component, OnInit } from '@angular/core';

import { TaskDto } from '../../dtos/task.dto';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public tasks: TaskDto[] = [];
  public loading = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.list().subscribe({
      next: tasks => this.tasks = tasks,
      error: error => {
        console.log(error);
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }

  addNewTask() {
    this.loading = true;
    const task = new TaskDto();
    task.name = 'New Task';
    this.taskService.create(task).subscribe({
      next: () => this.loadTasks(),
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }

  removeTask(task: TaskDto) {
    this.tasks = this.tasks.filter(actualTask => actualTask !== task);
  }

}
