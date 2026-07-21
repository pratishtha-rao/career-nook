export type TaskPriority =
  | "Low"
  | "Medium"
  | "High";


export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
};