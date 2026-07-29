"use client";

import { useState } from "react";
import { Job } from "@/types/Job";
import Button from "@/components/ui/Button";
import type { Contact } from "@/types/Contact";
import { useRouter } from "next/navigation";
import type { Task } from "@/types/Task";
import type { Material } from "@/types/Material";

type Props = {
  job: Job;

  contacts: Contact[];
  tasks: Task[];
  materials: Material[];

  onDelete: (id: number) => void;
  onEdit: (job: Job) => void;
  onArchive: (id: number) => void;

  onMoveUp?: (id: number) => void;
  onMoveDown?: (id: number) => void;
};

export default function JobCard({
  job,
  contacts,
  tasks,
  materials,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  onArchive,
}: Props) {

  const router = useRouter();

  const [expanded, setExpanded] = useState(false);

  useState(false);

  const [showContactPicker, setShowContactPicker] = useState(false);

  const [showTaskPicker, setShowTaskPicker] = useState(false);

const [showMaterialPicker, setShowMaterialPicker] =
  useState(false);

  async function attachContact(contactId: number) {
  const response = await fetch(
    `/api/jobs/${job.id}/contacts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactId,
      }),
    }
  );

  if (!response.ok) {
    alert("Unable to attach contact.");
    return;
  }

  window.location.reload();
}

const availableContacts = contacts.filter(
  (contact) =>
    !job.contacts.some(
      (jc) => jc.contact.id === contact.id
    )
);

const availableTasks = tasks.filter(
  (task) =>
    !job.tasks.some(
      (jt) => jt.task.id === task.id
    )
);

const availableMaterials = materials.filter(
  (material) =>
    !job.materials.some(
      (jm) => jm.material.id === material.id
    )
);

async function attachTask(taskId: number) {
  const response = await fetch(
    `/api/jobs/${job.id}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId,
      }),
    }
  );

  if (!response.ok) {
    alert("Unable to attach task.");
    return;
  }

  window.location.reload();
}

async function attachMaterial(materialId: number) {
  const response = await fetch(
    `/api/jobs/${job.id}/materials`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        materialId,
      }),
    }
  );

  if (!response.ok) {
    alert("Unable to attach material.");
    return;
  }

  window.location.reload();
}

  function statusColor(status: string) {
    if (status.includes("Offer"))
      return "bg-green-100 text-green-700 border-green-200";

    if (status.includes("Interview"))
      return "bg-purple-100 text-purple-700 border-purple-200";

    if (
      status === "Rejected" ||
      status === "Ghosted"
    )
      return "bg-red-100 text-red-700 border-red-200";

    if (status === "Applied")
      return "bg-blue-100 text-blue-700 border-blue-200";

    return "bg-slate-100 text-slate-700 border-slate-200";
  }




  return (
  <div
    className="
      rounded-xl
      border
      border-blue-100
      bg-white
      p-4
      shadow-sm
      transition
      hover:shadow-md
    "
  >
    {/* Header */}
    <div className="flex items-start justify-between gap-4">

      <div className="flex-1">

        <div className="flex items-center gap-3 flex-wrap">

          <h2 className="text-xl font-bold text-slate-900">
            {job.company}
          </h2>

          <span
            className={`
              rounded-full
              border
              px-3
              py-1
              text-xs
              font-semibold
              ${statusColor(job.status)}
            `}
          >
            {job.status}
          </span>

        </div>

        <p className="mt-1 text-slate-600">
          {job.position}
        </p>

      </div>

      <div className="flex items-center gap-2">

        {onMoveUp && (
          <Button
            onClick={() => onMoveUp(job.id)}
            className="border bg-white px-3"
          >
            ▲
          </Button>
        )}

        {onMoveDown && (
          <Button
            onClick={() => onMoveDown(job.id)}
            className="border bg-white px-3"
          >
            ▼
          </Button>
        )}

      </div>

    </div>

    {/* Compact Info */}

    <div className="mt-4 space-y-1 text-sm text-slate-700">

      <p>
        <span className="font-semibold">Applied:</span>{" "}
        {new Date(job.dateApplied).toLocaleDateString()}
      </p>

      {job.location && (
        <p>
          <span className="font-semibold">Location:</span>{" "}
          {job.location}
        </p>
      )}

      {job.officeType && (
        <p>
          <span className="font-semibold">Office Type:</span>{" "}
          {job.officeType}
        </p>
      )}

      {job.salary && (
        <p>
          <span className="font-semibold">Salary:</span>{" "}
          {job.salary}
        </p>
      )}

    </div>
    
        {/* Expanded Details */}

    {expanded && (
      <>

        {job.description && (
          <div className="mt-5">
            <h3 className="font-semibold">
              Description
            </h3>

            <div className="mt-2 rounded-lg bg-slate-50 p-4 whitespace-pre-wrap text-sm">
              {job.description}
            </div>
          </div>
        )}

        {job.notes && (
          <div className="mt-5">
            <h3 className="font-semibold">
              Notes
            </h3>

            <div className="mt-2 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 whitespace-pre-wrap text-sm">
              {job.notes}
            </div>
          </div>
        )}

        {job.salaryNotes && (
          <div className="mt-5">
            <h3 className="font-semibold">
              Salary Notes
            </h3>

            <div className="mt-2 rounded-lg bg-green-50 p-4 whitespace-pre-wrap text-sm">
              {job.salaryNotes}
            </div>
          </div>
        )}

        {job.referredBy && (
          <div className="mt-5">
            <h3 className="font-semibold">
              Referred By
            </h3>

            <p>{job.referredBy}</p>
          </div>
        )}

        {job.url && (
          <a
            href={
              job.url.startsWith("http")
                ? job.url
                : `https://${job.url}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-blue-600 hover:underline"
          >
            View Job Posting →
          </a>
        )}

<div className="mt-6">
  <h3 className="mb-2 font-semibold">
    Contacts
  </h3>

  {job.contacts.length === 0 ? (
    <p className="text-sm text-slate-500">
      No contacts linked.
    </p>
  ) : (
    job.contacts.map(({ contact }) => (
      <div
        key={contact.id}
        className="mb-2 flex items-center justify-between rounded bg-slate-50 p-3"
      >
        <div>
          <p className="font-medium">
            {contact.name}
          </p>

          <p className="text-sm text-slate-500">
            {contact.company}
          </p>
        </div>

<div className="flex gap-2">
  <button
    onClick={() =>
      router.push(`/contacts?contact=${contact.id}`)
    }
    className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
  >
    View
  </button>

  <button
    onClick={async () => {
      await fetch(
        `/api/jobs/${job.id}/contacts/${contact.id}`,
        {
          method: "DELETE",
        }
      );

      window.location.reload();
    }}
    className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
  >
    Delete
  </button>
</div>
      </div>
    ))
  )}

<button
  onClick={() => setShowContactPicker(true)}
  className="mt-2 rounded bg-blue-600 px-3 py-2 text-white"
>
  + Add Contact
</button>

</div>

{showContactPicker && (
  <div className="mt-3 rounded-lg border bg-white p-3">
    <p className="mb-2 font-medium">
      Select a contact
    </p>

    {availableContacts.length === 0 ? (
      <p className="text-sm text-slate-500">
        Every contact is already attached.
      </p>
    ) : (
      <div className="space-y-2">
        {availableContacts.map((contact) => (
          <button
            key={contact.id}
            onClick={async () => {
              await attachContact(contact.id);
              setShowContactPicker(false);
            }}
            className="flex w-full items-center justify-between rounded border p-2 hover:bg-slate-50"
          >
            <div className="text-left">
              <div className="font-medium">
                {contact.name}
              </div>

              <div className="text-sm text-slate-500">
                {contact.company}
              </div>
            </div>
          </button>
        ))}
      </div>
    )}

    <button
      onClick={() => setShowContactPicker(false)}
      className="mt-3 rounded border px-3 py-2"
    >
      Cancel
    </button>
  </div>
)}

    {/* ---------------- Tasks ---------------- */}

    <div className="mt-8">
      <h3 className="mb-2 font-semibold">
        Tasks
      </h3>

{job.tasks.length === 0 ? (
  <p className="text-sm text-slate-500">
    No tasks linked.
  </p>
) : (
  job.tasks.map(({ task }) => (
    <div
      key={task.id}
      className="mb-2 flex items-center justify-between rounded bg-slate-50 p-3"
    >
      <div>
        <p className="font-medium">
          {task.title}
        </p>

        <p className="text-sm text-slate-500">
          {task.status} • {task.priority}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() =>
            router.push(`/tasks?task=${task.id}`)
          }
          className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
        >
          View
        </button>

        <button
          onClick={async () => {
            await fetch(
              `/api/jobs/${job.id}/tasks/${task.id}`,
              {
                method: "DELETE",
              }
            );

            window.location.reload();
          }}
          className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  ))
)}

<button
  onClick={() => setShowTaskPicker(true)}
  className="mt-2 rounded bg-blue-600 px-3 py-2 text-white"
>
  + Add Task
</button>

    </div>

{showTaskPicker && (
  <div className="mt-3 rounded-lg border bg-white p-3">
    <p className="mb-2 font-medium">
      Select a task
    </p>

    {availableTasks.length === 0 ? (
      <p className="text-sm text-slate-500">
        Every task is already attached.
      </p>
    ) : (
      <div className="space-y-2">
        {availableTasks.map((task) => (
          <button
            key={task.id}
            onClick={async () => {
              await attachTask(task.id);
              setShowTaskPicker(false);
            }}
            className="flex w-full justify-between rounded border p-2 hover:bg-slate-50"
          >
            <div className="text-left">
              <div className="font-medium">
                {task.title}
              </div>

              <div className="text-sm text-slate-500">
                {task.status}
              </div>
            </div>
          </button>
        ))}
      </div>
    )}

    <button
      onClick={() => setShowTaskPicker(false)}
      className="mt-3 rounded border px-3 py-2"
    >
      Cancel
    </button>
  </div>

)}

    {/* ---------------- Materials ---------------- */}

    <div className="mt-8">
      <h3 className="mb-2 font-semibold">
        Materials
      </h3>

      {job.materials.length === 0 ? (
        <p className="text-sm text-slate-500">
          No materials linked.
        </p>
      ) : (

  job.materials.map(({ material }) => (
    <div
      key={material.id}
      className="mb-2 flex items-center justify-between rounded bg-slate-50 p-3"
    >
      <div>
        <p className="font-medium">
          {material.name}
        </p>

        <p className="text-sm text-slate-500">
          {material.type}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() =>
            router.push(`/materials?material=${material.id}`)
          }
          className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
        >
          View
        </button>

        <button
          onClick={async () => {
            await fetch(
              `/api/jobs/${job.id}/materials/${material.id}`,
              {
                method: "DELETE",
              }
            );

            window.location.reload();
          }}
          className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  ))
)}

<button
  onClick={() => setShowMaterialPicker(true)}
  className="mt-2 rounded bg-blue-600 px-3 py-2 text-white"
>
  + Add Material
</button>

    </div>
  </>
)}

{showMaterialPicker && (
  <div className="mt-3 rounded-lg border bg-white p-3">
    <p className="mb-2 font-medium">
      Select a material
    </p>

    {availableMaterials.length === 0 ? (
      <p className="text-sm text-slate-500">
        Every material is already attached.
      </p>
    ) : (
      <div className="space-y-2">
        {availableMaterials.map((material) => (
          <button
            key={material.id}
            onClick={async () => {
              await attachMaterial(material.id);
              setShowMaterialPicker(false);
            }}
            className="flex w-full justify-between rounded border p-2 hover:bg-slate-50"
          >
            <div className="text-left">
              <div className="font-medium">
                {material.name}
              </div>

              <div className="text-sm text-slate-500">
                {material.type}
              </div>
            </div>
          </button>
        ))}
      </div>
    )}

    <button
      onClick={() => setShowMaterialPicker(false)}
      className="mt-3 rounded border px-3 py-2"
    >
      Cancel
    </button>
  </div>
)}

    {/* Footer */}

    <div className="mt-6 flex flex-wrap gap-3">

      <Button
        onClick={() => setExpanded(!expanded)}
        className="border bg-white"
      >
        {expanded ? "View Less" : "View More"}
      </Button>

      <Button
        onClick={() => onEdit(job)}
        className="bg-blue-800 text-white text-slate-700 hover:bg-blue-900"
      >
        Edit
      </Button>

<button
  onClick={() => onArchive(job.id)}
  className="border border-yellow-300 bg-yellow-600 px-5 py-2 text-black-700 hover:bg-yellow-700"
>
  Archive
</button>

      <Button
        onClick={() => onDelete(job.id)}
        className="bg-red-800 text-white hover:bg-red-600"
      >
        Delete
      </Button>

    </div>

  </div>
);
}