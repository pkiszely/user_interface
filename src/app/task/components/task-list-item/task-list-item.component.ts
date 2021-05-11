import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TaskDto } from '../../dtos/task.dto';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit, OnDestroy {

  public loading = false;
  @Input() public task: TaskDto;
  @Input() public disabled: boolean;
  @Output() public change = new EventEmitter<TaskDto>();
  @Output() public delete = new EventEmitter<TaskDto>();
  public now: number = Date.now();
  private timekeeper: number;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.timekeeper = window.setInterval(() => {
      this.now = Date.now();
    }, 1000);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timekeeper);
  }

  updateTask() {
    this.loading = true;
    this.taskService.update(this.task).subscribe({
      next: updatedTask => this.change.emit(updatedTask)
    }).add(() => {
      this.loading = false;
    });
  }

  deleteTask() {
    this.loading = true;
    this.taskService.delete(this.task).subscribe({
      next: () => this.delete.emit(this.task)
    }).add(() => {
      this.loading = false;
    });
  }

}
