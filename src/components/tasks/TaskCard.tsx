import { Task } from "@/types/Task";

type Props = {
  task: Task;

  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onArchive,
}: Props) {
  return (
    <div
      className="
        w-full rounded-xl border border-blue-100
        bg-white p-4 shadow-sm transition
        hover:shadow-lg sm:p-6
      "
    >
      {/* Header */}

      <div
        className="
          flex flex-col gap-3
          sm:flex-row sm:items-start
          sm:justify-between
        "
      >
        <h2
          className="
            break-words text-xl font-bold
            text-slate-950 sm:text-2xl
          "
        >
          {task.title}
        </h2>

        <span
          className="
            w-fit rounded bg-blue-100
            px-3 py-1 text-sm
            font-semibold text-blue-700
          "
        >
          {task.status}
        </span>
      </div>

      {/* Description */}

      <p
        className="
          mt-3 break-words
          text-slate-600
        "
      >
        {task.description}
      </p>

      {/* Details */}

      <div
        className="
          mt-5 grid grid-cols-1
          gap-4 text-sm
          sm:grid-cols-2
        "
      >
        <div>
          <p className="text-slate-500">
            Due Date
          </p>

          <p className="font-semibold break-words">
            {task.dueDate
              ? new Date(
                  task.dueDate
                ).toLocaleDateString()
              : "No due date"}
          </p>
        </div>

        <div>
          <p className="text-slate-500">
            Priority
          </p>

          <p className="font-semibold break-words">
            {task.priority}
          </p>
        </div>
      </div>

      {/* Actions */}

      <div
        className="
          mt-6 flex flex-col
          gap-2
        "
      >
        <button
          onClick={() => onEdit(task)}
          className="
            bg-blue-800 text-white text-slate-700 
            hover:bg-blue-900"
        >
          Edit
        </button>

        <button
          onClick={() => onArchive(task.id)}
          className="
            border border-yellow-300 bg-yellow-600 px-5 py-2 text-black-700 hover:bg-yellow-700
          "
        >
          Archive
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="
            bg-red-800 text-white hover:bg-red-600
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}