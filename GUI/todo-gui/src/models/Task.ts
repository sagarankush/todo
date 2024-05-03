// create a model for task, it has a title, description, and a due date
export default interface Task {
    id: number;
    userId: number;
    title: string;
    details: string;
    dueDate: string;
}