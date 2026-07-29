"use client";

import { useEffect, useState } from "react";

import type { Job } from "@/types/Job";
import type { Task } from "@/types/Task";
import type { Contact } from "@/types/Contact";
import type { Material } from "@/types/Material";

export default function ArchivePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadArchive();
  }, []);

  async function loadArchive() {
    try {
      const [
        jobsResponse,
        tasksResponse,
        contactsResponse,
        materialsResponse,
      ] = await Promise.all([
        fetch("/api/jobs/archived"),
        fetch("/api/tasks/archived"),
        fetch("/api/contacts/archived"),
        fetch("/api/materials/archived"),
      ]);

      const [
        jobsData,
        tasksData,
        contactsData,
        materialsData,
      ] = await Promise.all([
        jobsResponse.json(),
        tasksResponse.json(),
        contactsResponse.json(),
        materialsResponse.json(),
      ]);

      setJobs(Array.isArray(jobsData) ? jobsData : []);
      setTasks(Array.isArray(tasksData) ? tasksData : []);
      setContacts(Array.isArray(contactsData) ? contactsData : []);
      setMaterials(Array.isArray(materialsData) ? materialsData : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function restore(
    type: string,
    id: number
  ) {
    await fetch(
      `/api/${type}/archived/${id}/restore`,
      {
        method: "PATCH",
      }
    );

    loadArchive();
  }

  async function permanentlyDelete(
    type: string,
    id: number
  ) {
    if (
      !confirm(
        "Permanently delete this item?"
      )
    ) {
      return;
    }

    await fetch(
      `/api/${type}/${id}`,
      {
        method: "DELETE",
      }
    );

    loadArchive();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f9ff]">
        <p className="text-slate-600">
          Loading archive...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f9ff] py-10">
      <div className="mx-auto max-w-7xl px-8">
        <h1 className="mb-10 text-center text-5xl font-bold">
          Archive
        </h1>

        {/* Jobs */}

        <Section title="Jobs" count={jobs.length}>
          {jobs.map((job) => (
            <ArchiveCard
              key={job.id}
              title={job.position}
              subtitle={job.company}
              onRestore={() =>
                restore("jobs", job.id)
              }
              onDelete={() =>
                permanentlyDelete(
                  "jobs",
                  job.id
                )
              }
            />
          ))}
        </Section>

        {/* Tasks */}

        <Section
          title="Tasks"
          count={tasks.length}
        >
          {tasks.map((task) => (
            <ArchiveCard
              key={task.id}
              title={task.title}
              subtitle={
                task.description ?? ""
              }
              onRestore={() =>
                restore("tasks", task.id)
              }
              onDelete={() =>
                permanentlyDelete(
                  "tasks",
                  task.id
                )
              }
            />
          ))}
        </Section>

        {/* Contacts */}

        <Section
          title="Contacts"
          count={contacts.length}
        >
          {contacts.map((contact) => (
            <ArchiveCard
              key={contact.id}
              title={contact.name}
              subtitle={contact.company}
              onRestore={() =>
                restore(
                  "contacts",
                  contact.id
                )
              }
              onDelete={() =>
                permanentlyDelete(
                  "contacts",
                  contact.id
                )
              }
            />
          ))}
        </Section>

        {/* Materials */}

        <Section
          title="Materials"
          count={materials.length}
        >
          {materials.map((material) => (
            <ArchiveCard
              key={material.id}
              title={material.name}
              subtitle={material.type}
              onRestore={() =>
                restore(
                  "materials",
                  material.id
                )
              }
              onDelete={() =>
                permanentlyDelete(
                  "materials",
                  material.id
                )
              }
            />
          ))}
        </Section>
      </div>
    </main>
  );
}

type SectionProps = {
  title: string;
  count: number;
  children: React.ReactNode;
};

function Section({
  title,
  count,
  children,
}: SectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold">
        {title} ({count})
      </h2>

      {count === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-8 text-slate-500">
          No archived {title.toLowerCase()}.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {children}
        </div>
      )}
    </section>
  );
}

type ArchiveCardProps = {
  title: string;
  subtitle: string;
  onRestore: () => void;
  onDelete: () => void;
};

function ArchiveCard({
  title,
  subtitle,
  onRestore,
  onDelete,
}: ArchiveCardProps) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-slate-600">
        {subtitle}
      </p>

      <div className="mt-5 flex gap-3">
        <button
          onClick={onRestore}
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Restore
        </button>

        <button
          onClick={onDelete}
          className="rounded border border-red-300 px-4 py-2 font-medium text-red-600 hover:bg-red-50"
        >
          Delete Forever
        </button>
      </div>
    </div>
  );
}
