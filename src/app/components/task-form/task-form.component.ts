import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, switchMap } from 'rxjs';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private taskService = inject(TaskService);
  taskId!: number;
  isEditMode: boolean = false;
  taskForm!: FormGroup;
  formError: boolean = false;

  constructor() {
    this.route.params
      .pipe(
        map((p) => {
          this.taskId = p['id'];
        }),
        switchMap(() => {
          return this.route.queryParams.pipe(
            map((params) => {
              this.isEditMode = params['editMode'] || false;
              if (this.isEditMode) {
                const task = this.taskService.getTaskById(this.taskId);
                this.taskForm = this.formBuilder.group({
                  id: [task.id, Validators.required],
                  title: [task.title, Validators.required],
                  description: [task.description, Validators.required],
                  dueDate: [task.dueDate, Validators.required],
                  isCompleted: [task.isCompleted],
                });
              } else {
                this.taskForm = this.formBuilder.group({
                  id: ['', Validators.required],
                  title: ['', Validators.required],
                  description: ['', Validators.required],
                  dueDate: ['', Validators.required],
                  isCompleted: [false],
                });
              }
            })
          );
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.taskForm.valueChanges.subscribe(() => {
      this.formError = false;
    });
  }

  onSubmit() {
    this.formError = false;
    const isIdExist = this.taskService.tasks$.value.some(
      (task) => +task.id === +this.taskForm.value.id
    );
    if (this.taskForm.valid) {
      if (this.isEditMode) {
        this.taskService.updateTask(this.taskForm.value);
        alert('task updated successfully');
        this.router.navigateByUrl('tasks');
      } else {
        if (!isIdExist) {
          this.taskService.addTask(this.taskForm.value);
          alert('task added successfully');
          this.router.navigateByUrl('tasks');
        } else {
          this.formError = true;
        }
      }
    } else {
      this.formError = true;
    }
  }
}
