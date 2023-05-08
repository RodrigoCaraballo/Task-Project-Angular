export interface UpdateTaskRequest {
    title: string;
    description: string;
    deadline: Date;
    completed: boolean;
}