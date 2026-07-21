export type TaskStatus =
  | "Not Started"
  | "In Progress"
  | "Completed";


export type TaskPriority =
  | "Low"
  | "Medium"
  | "High";


export type Task = {
  id: number;

  title: string;

  description: string;

  dueDate: string;

  priority: "High" | "Medium" | "Low";

  status: "Not Started" | "In Progress" | "Completed";
};


export type CreateTask = Omit<Task,"id">;