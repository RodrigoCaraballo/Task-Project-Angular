import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedMainContentService } from '../utils';
import { CreateTaskRequest, ITaskModel, UpdateTaskRequest } from '../../../domain';
import { CreateTaskUseCase, UpdateTaskUseCase } from '../../../application/use-cases';
import { TokenResponse } from '../../../domain/interfaces/responses';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input() taskEdit?: ITaskModel;
  activateNewTasks: boolean = false;
  showErrors: boolean = false;
  userId?: string;

  taskForm = this.fb.group({
    title: this.fb.nonNullable.control('',
      { validators: [Validators.required, Validators.pattern('^.{4,30}$')] }),
    description: this.fb.nonNullable.control('',
      { validators: [Validators.required, Validators.pattern('^.{0,100}$')] }),
    date: this.fb.nonNullable.control('',
      { validators: [Validators.required,]}),
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly mainContentHelperService: SharedMainContentService,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly createTaskUseCase: CreateTaskUseCase
  ) {}

  ngOnInit(): void {
    if(this.taskEdit) {
      this.taskForm.patchValue({
        title: this.taskEdit.title,
        description: this.taskEdit.description,
        date: this.taskEdit.deadline.toString()
      })
    }
    this.mainContentHelperService.nowIsActivate.subscribe(value => this.activateNewTasks = value);

    const token = localStorage.getItem('token');
    if (token) {
      const decodeToken: TokenResponse = jwt_decode(token);
      this.userId = decodeToken.userId;
    }
  }

  changeActivateNewTasks(data: boolean) {
    this.mainContentHelperService.changeActivateState(data)
  }

  saveTask() {
    if(this.taskForm.valid) {
      if(this.taskEdit) {
        this.editTask();
      }

      if(!this.taskEdit) {
        this.addTask()
      }
    }

    if(this.taskForm.invalid) {
      this.showErrors = true;

      setTimeout(() => {
        this.showErrors = false;
      }, 3000)
    }
  }

  private editTask() {
    this.mainContentHelperService.changeSpinnerValue(true);
    const formValues = this.taskForm.getRawValue();
    const editedTask: UpdateTaskRequest = {
      title: formValues.title,
      description: formValues.description,
      deadline: new Date(formValues.date),
      completed: this.taskEdit!.completed
    };
    this.updateTaskUseCase.execute(this.taskEdit!.taskId, editedTask)
      .subscribe({
        next: (newEditedTask: ITaskModel) => {
          this.mainContentHelperService.changeSpinnerValue(false);
          this.mainContentHelperService.setDeletedTask(newEditedTask)
            this.mainContentHelperService.addNewTask(newEditedTask);
            this.mainContentHelperService.changeActivateState(false)
        },
        error: () => {
          this.mainContentHelperService.changeSpinnerValue(false);
        }
      });
  }

  private addTask() {
    if(!this.userId) return;
    this.mainContentHelperService.changeSpinnerValue(true);
    const formValues = this.taskForm.getRawValue();

    const newTask: CreateTaskRequest = {
      user: this.userId,
      title: formValues.title,
      description: formValues.description,
      deadline: new Date(formValues.date),
      completed: false
    }
    this.createTaskUseCase.execute(newTask)
    .subscribe({
      next: (newAddedTask: ITaskModel) => {
        this.mainContentHelperService.changeSpinnerValue(false);
        this.mainContentHelperService.addNewTask(newAddedTask);
        this.mainContentHelperService.changeActivateState(false)
    },
    error: () => {
      this.mainContentHelperService.changeSpinnerValue(false);
    }
    });
  }

}
