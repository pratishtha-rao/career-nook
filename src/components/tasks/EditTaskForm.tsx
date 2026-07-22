"use client";

import { useState } from "react";

import {
  Task,
  TaskPriority,
  TaskStatus,
} from "@/types/Task";


type Props = {
  task: Task;
  onSave: (task: Task) => void;
  onCancel: () => void;
};


export default function EditTaskForm({
  task,
  onSave,
  onCancel,
}: Props) {


  const [title, setTitle] = useState(task.title);

  const [description, setDescription] = useState(
    task.description ?? ""
  );

  const [dueDate, setDueDate] = useState(task.dueDate);

  const [priority, setPriority] =
    useState<TaskPriority>(task.priority);

  const [status, setStatus] =
    useState<TaskStatus>(task.status);



  function submit(e: React.FormEvent) {

    e.preventDefault();


    onSave({
      ...task,
      title,
      description,
      dueDate,
      priority,
      status,
    });

  }



  return (

    <form
      onSubmit={submit}
      className="
        border
        border-blue-100
        bg-white
        p-6
        shadow-sm
      "
    >


      <div className="
        mb-6
        flex
        items-center
        justify-between
      ">

        <h2 className="
          text-2xl
          font-bold
          text-slate-900
        ">
          Edit Task
        </h2>


        <span className="
          bg-blue-50
          px-3
          py-1
          text-sm
          font-medium
          text-blue-600
        ">
          Update
        </span>


      </div>




      <div className="
        grid
        gap-4
      ">


        <input

          value={title}

          onChange={(e)=>setTitle(e.target.value)}

          placeholder="Task title"

          className="
            border
            border-slate-200
            p-3
            outline-none
            transition
            focus:border-blue-500
          "

        />




        <textarea

          value={description}

          onChange={(e)=>setDescription(e.target.value)}

          placeholder="Description"

          className="
            min-h-[120px]
            border
            border-slate-200
            p-3
            outline-none
            transition
            focus:border-blue-500
          "

        />




        <div className="
          grid
          gap-4
          md:grid-cols-3
        ">


          <input

            type="date"

            value={dueDate}

            onChange={(e)=>setDueDate(e.target.value)}

            className="
              border
              border-slate-200
              p-3
              outline-none
              focus:border-blue-500
            "

          />




          <select

            value={priority}

            onChange={(e)=>
              setPriority(
                e.target.value as TaskPriority
              )
            }

            className="
              border
              border-slate-200
              p-3
              outline-none
              focus:border-blue-500
            "

          >

            <option>
              Low
            </option>

            <option>
              Medium
            </option>

            <option>
              High
            </option>

          </select>





          <select

            value={status}

            onChange={(e)=>
              setStatus(
                e.target.value as TaskStatus
              )
            }

            className="
              border
              border-slate-200
              p-3
              outline-none
              focus:border-blue-500
            "

          >

            <option>
              Not Started
            </option>

            <option>
              In Progress
            </option>

            <option>
              Completed
            </option>

          </select>


        </div>


      </div>






      <div className="
        mt-6
        flex
        gap-3
      ">


        <button

          type="submit"

          className="
            bg-blue-600
            px-7
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "

        >
          Save Changes

        </button>




        <button

          type="button"

          onClick={onCancel}

          className="
            border
            border-slate-300
            px-7
            py-3
            font-semibold
            text-slate-700
            transition
            hover:border-blue-500
            hover:text-blue-600
          "

        >
          Cancel

        </button>


      </div>


    </form>

  );

}