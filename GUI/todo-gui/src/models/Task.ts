export default interface Task {
    taskId: number;
    userId: number;
    title: string;
    details: string;
    dueDate: Date;
}