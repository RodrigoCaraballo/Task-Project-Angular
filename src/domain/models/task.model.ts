import { IUserModel } from "./user.model";

export interface ITaskModel {
    taskId: string;
    title: string;
    description: string;
    deadline: Date;
    completed: boolean;
    user: IUserModel
}
