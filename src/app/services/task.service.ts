import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { tasksData } from '../models/tasks.consts';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = tasksData;
  tasks$ = new BehaviorSubject<Task[]>(tasksData);

  constructor() {}

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(taskId: number): Task {
    const task = this.tasks.find((task) => +task.id === +taskId);

    return task as Task;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.tasks$.next(this.tasks);
  }

  updateTask(task: Task): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.tasks$.next(this.tasks);
    }
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.tasks$.next(this.tasks);
  }
}
