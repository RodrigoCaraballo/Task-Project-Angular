import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedMainContentService } from '../utils';
import { ITaskModel } from '../../../domain';
import { TokenResponse } from '../../../domain/interfaces/responses';
import jwt_decode from 'jwt-decode';
import { GetTasksUseCase, SignOutUseCase } from '../../../application/use-cases';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  tasksToDo: ITaskModel[] = [];
  tasksCompleted: ITaskModel[] = [];
  activateNewTasks: boolean = false;
  activateEditTasks: boolean = false;
  activeUser!: TokenResponse;
  signOutMessage: boolean = false;
  loadingMsg: boolean = false;

  selectedTask?: ITaskModel;

  constructor(
    private readonly fb: FormBuilder,
    private readonly mainContentHelperService: SharedMainContentService,
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly signOutUseCase: SignOutUseCase,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.mainContentHelperService.nowIsActivate.subscribe(value => this.activateNewTasks = value);
    this.mainContentHelperService.getSelectedTask.subscribe(value => {
      if(value) this.selectedTask = value;
      if(!value) this.selectedTask = undefined;
    });
    this.getLists()
    this.getAddedTask()
    this.mainContentHelperService.taskDeleted.subscribe(task => {
        const completedList = this.tasksCompleted.filter(t => t.taskId !== task.taskId)
        this.tasksCompleted = completedList;

        const toDoList = this.tasksToDo.filter(t => t.taskId !== task.taskId)
        this.tasksToDo = toDoList;
    })
    this.mainContentHelperService.getSpinner.subscribe((value: boolean) => {
      this.loadingMsg = value
    })

  }

  signOut(): void {
    this.signOutUseCase.execute()
    .subscribe(value => {
      if(value) {
        this.signOutMessage = true
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500)
      }
    })
  }

  changeActivateNewTasks(data: boolean) {
    this.selectedTask = undefined;
    this.mainContentHelperService.changeActivateState(data)
  }

  changeActivateNewTasksAndEdit(data: boolean) {
    this.mainContentHelperService.changeActivateState(data)
  }

  private getLists(): void {
    this.mainContentHelperService.changeSpinnerValue(true);
    const token = localStorage.getItem('token');

    if (token) {
      const decodeToken: TokenResponse = jwt_decode(token);
      this.activeUser = decodeToken;

      this.getTasksUseCase.execute(decodeToken.userId)
        .subscribe({
          next: tasks => {
            let toDo: ITaskModel[] = [];
            let completed: ITaskModel[] = [];
            tasks.forEach(task => {
              if (task.completed) completed.push(task);
              if (!task.completed) toDo.push(task);
            })

            this.sortList(toDo);
            this.sortList(completed);

            this.tasksToDo = toDo;
            this.tasksCompleted = completed;
          },
          error: () => {
            this.mainContentHelperService.changeSpinnerValue(false);
          }
        })
    }
    this.mainContentHelperService.changeSpinnerValue(false);
  }

  private sortList(list: ITaskModel[]): ITaskModel[] {
    return list.sort((a, b) => {
      if (b.deadline > a.deadline) return -1
      if (b.deadline < a.deadline) return 1
      return 0
    });
  }

  private getAddedTask(): void {
    this.mainContentHelperService.changeSpinnerValue(true);
    this.mainContentHelperService.getNewTask.subscribe({
      next: value => {
        if (value) {
          if (value.completed) {
            const toDoList = this.tasksToDo.filter(task => task.taskId !== value.taskId )
            this.tasksToDo = toDoList;

            this.tasksCompleted.push(value);
            this.sortList(this.tasksToDo);
          }
          if (!value.completed) {
            const completedList = this.tasksCompleted.filter(task => task.taskId !== value.taskId )
            this.tasksCompleted = completedList;

            this.tasksToDo.push(value);
            this.sortList(this.tasksToDo);
          }
        }
        this.mainContentHelperService.changeSpinnerValue(false);
      },
      error: () => {
        this.mainContentHelperService.changeSpinnerValue(false);
      }
    })

    this.mainContentHelperService.changeSpinnerValue(false);
  }
}
