"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import SearchBar from "@/components/common/SearchBar";
import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";
import EditTaskForm from "@/components/tasks/EditTaskForm";

import type {
  Task,
  CreateTask,
} from "@/types/Task";

export default function TasksPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

const selectedTask = searchParams.get("task");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    void loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const response = await fetch("/api/tasks", {
        cache: "no-store",
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setTasks([]);
        return;
      }

      setTasks(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }

async function archiveTask(id: number) {
  const response = await fetch(
    `/api/tasks/archived/${id}`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) return;

  await loadTasks();
}

  async function addTask(task: CreateTask) {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) return;

    await loadTasks();
  }

  async function deleteTask(id: number) {
    const response = await fetch(
      `/api/tasks/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) return;

    await loadTasks();
  }

  async function saveEditedTask(
    task: Task
  ) {
    const response = await fetch(
      `/api/tasks/${task.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) return;

    await loadTasks();

    setEditingTask(null);
  }

  const displayedTasks = useMemo(() => {
    let filtered = tasks;

    if (search.trim()) {
      const term =
        search.toLowerCase();

      filtered = filtered.filter(
        (task) =>
          `${task.title}
           ${task.description}
           ${task.priority}
           ${task.status}`
            .toLowerCase()
            .includes(term)
      );
    }

    return filtered;
  }, [tasks, search]);

  useEffect(() => {
  if (!selectedTask) return;

  const element = document.getElementById(
    `task-${selectedTask}`
  );

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}, [selectedTask, displayedTasks]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f9ff]">
        <p className="text-lg text-slate-600">
          Loading tasks...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f9ff] py-10">
      <div className="mx-auto w-full max-w-6xl px-8">
        {/* Header */}

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-950">
            Tasks
          </h1>

          <p className="mt-2 text-slate-600">
            Organize deadlines,
            priorities, and career
            progress.
          </p>
        </div>

        {/* Add Task */}

        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <TaskForm
            onAddTask={addTask}
          />
        </div>

        {/* Search */}

        <div className="mt-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search tasks..."
          />
        </div>

        {/* Edit */}

        {editingTask && (
          <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <EditTaskForm
              task={editingTask}
              onSave={
                saveEditedTask
              }
              onCancel={() =>
                setEditingTask(
                  null
                )
              }
            />
          </div>
        )}

        {/* Task Count */}

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-slate-900">
            All Tasks
          </h2>

          <p className="mt-1 text-slate-500">
            {
              displayedTasks.length
            }{" "}
            task
            {displayedTasks.length !==
              1 && "s"}
          </p>
        </div>

        {/* Task List */}

        {displayedTasks.length ===
        0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-blue-200 bg-white p-12 text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              No tasks found
            </h3>

            <p className="mt-3 text-slate-500">
              Try another search
              or add a new task.
            </p>
          </div>
        ) : (
            
<div className="mt-8 grid justify-items-center gap-5 md:grid-cols-2">
  {displayedTasks.map((task) => (
    <div
      key={task.id}
      id={`task-${task.id}`}
      className="w-full max-w-xl"
    >
      <TaskCard
        task={task}
        onEdit={setEditingTask}
        onDelete={deleteTask}
        onArchive={archiveTask}
      />
    </div>
  ))}
</div>
        )}
      </div>
    </main>
  );
}


