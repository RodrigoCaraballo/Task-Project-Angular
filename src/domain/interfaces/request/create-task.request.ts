export interface CreateTaskRequest {
    title: string;
    description: string;
    deadline: Date;
    completed: boolean;
    user: string
}