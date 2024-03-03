import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  private router = inject(Router);
  tasks$: Observable<Task[]> = this.taskService.tasks$;

  ngOnInit(): void {}

  deleteTask(id: number) {
    let prevTasks = this.taskService.tasks$.value;
    prevTasks = prevTasks.filter((obj) => +obj.id !== +id);
    this.taskService.tasks$.next(prevTasks);
  }

  navigateToEdit(id: number) {
    this.router.navigateByUrl(`tasks/${id}?editMode=true`);
  }
}
