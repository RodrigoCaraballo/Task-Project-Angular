import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { ITaskModel } from "../../../domain";
import { } from "../../../application/use-cases";

@Injectable()
export class SharedMainContentService {
  private formActivate = new BehaviorSubject<boolean>(false)
  nowIsActivate = this.formActivate.asObservable();

  private selectedTask = new Subject<ITaskModel>
  getSelectedTask = this.selectedTask.asObservable();

  private newTask = new Subject<ITaskModel>
  getNewTask = this.newTask.asObservable();

  private deleteTask = new Subject<ITaskModel>
  taskDeleted = this.deleteTask.asObservable();

  constructor() { }

  changeActivateState(value: boolean): void {
    this.formActivate.next(value)
  }

  addNewTask(value: ITaskModel): void {
    this.newTask.next(value);
  }

  changeSelectedTask(value: ITaskModel): void {
    this.selectedTask.next(value);
  }

  setDeletedTask(value: ITaskModel): void {
    this.deleteTask.next(value);
  }
}
