"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import JobCard from "@/components/jobs/JobCard";
import JobForm from "@/components/jobs/JobForm";
import EditJobForm from "@/components/jobs/EditJobForm";
import FolderSidebar from "@/components/folders/FolderSidebar";
import FilterBar from "@/components/filters/FilterBar";
import { JOB_STATUSES } from "@/constants/job-statuses";
import type { Contact } from "@/types/Contact";
import type { Task } from "@/types/Task";
import type { Material } from "@/types/Material";
import type { Folder } from "@/types/Folder";

import SearchBar from "@/components/common/SearchBar";

import type {
  Job,
  CreateJob,
  UpdateJob,
} from "@/types/Job";

export default function JobsPage() {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [folders, setFolders] =useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] =
    useState<number | null>(null);
    const [selectedStatus, setSelectedStatus] =
  useState("All");
  const [editingJob, setEditingJob] =
    useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [contacts, setContacts] = useState<Contact[]>([]);
const [tasks, setTasks] = useState<Task[]>([]);
const [materials, setMaterials] = useState<Material[]>([]);

useEffect(() => {
  void loadJobs();
  void loadFolders();
  void loadContacts();
  void loadTasks();
  void loadMaterials();
}, []);

async function loadJobs() {
  try {
    const response = await fetch("/api/jobs", {
      cache: "no-store",
    });

    if (response.status === 401) {
      router.push("/login");
      return;
    }

    const data = await response.json();

    setJobs(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error(error);
    setJobs([]);
  } finally {
    setLoading(false);
  }
}


async function loadContacts() {
  try {
    const response = await fetch("/api/contacts");

    if (!response.ok) return;

    const data = await response.json();

    setContacts(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error(error);
  }
}

async function loadTasks() {
  try {
    const response = await fetch("/api/tasks");

    if (!response.ok) return;

    const data = await response.json();

    setTasks(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error(error);
  }
}

async function loadMaterials() {
  try {
    const response = await fetch("/api/materials");

    if (!response.ok) return;

    const data = await response.json();

    setMaterials(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error(error);
  }
}

async function loadFolders() {
  try {
    const response = await fetch("/api/folders");

    if (!response.ok) return;

    const data = await response.json();

    setFolders(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error(error);
  }
}

  async function createFolder(name: string) {
    const response = await fetch("/api/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) return;

    const folder: Folder = await response.json();

    setFolders((previous) => [...previous, folder]);
  }

  async function deleteFolder(id: number) {
    const response = await fetch(`/api/folders/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) return;

    setFolders((previous) =>
      previous.filter((folder) => folder.id !== id)
    );

    if (selectedFolder === id) {
      setSelectedFolder(null);
    }
  }

  async function toggleCollapse(folder: Folder) {
    const response = await fetch(`/api/folders/${folder.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collapsed: !folder.collapsed,
      }),
    });

    if (!response.ok) return;

    const updated: Folder = await response.json();

    setFolders((previous) =>
      previous.map((item) =>
        item.id === updated.id ? updated : item
      )
    );
  }

  async function addJob(job: CreateJob) {
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });

    if (!response.ok) {
      console.error(await response.text());
      return;
    }

    const created: Job = await response.json();

    setJobs((previous) => [created, ...previous]);
  }

  async function deleteJob(id: number) {
    const response = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) return;

    setJobs((previous) =>
      previous.filter((job) => job.id !== id)
    );
  }

  async function saveEditedJob(updatedJob: UpdateJob) {
    const response = await fetch(`/api/jobs/${updatedJob.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });

    if (!response.ok) {
      console.error(await response.text());
      return;
    }

    const job: Job = await response.json();

    setJobs((previous) =>
      previous.map((item) =>
        item.id === job.id ? job : item
      )
    );

    setEditingJob(null);
  }

  async function archiveJob(id: number) {
  const response = await fetch(`/api/jobs/archived/${id}`, {
    method: "PATCH",
  });

  if (!response.ok) return;

  await loadJobs();
}

const displayedJobs = useMemo(() => {
  let filtered = jobs;

  // Folder filter
  if (selectedFolder !== null) {
    filtered = filtered.filter((job) =>
      job.folders.some(
        (folder) => folder.folderId === selectedFolder
      )
    );
  }

  // Status filter
  if (selectedStatus !== "All") {
    filtered = filtered.filter(
      (job) => job.status === selectedStatus
    );
  }

  // Search
  if (search.trim()) {
    const term = search.toLowerCase();

    filtered = filtered.filter((job) =>
      `${job.company}
       ${job.position}
       ${job.location}
       ${job.status}
       ${job.notes}
       ${job.description}`
        .toLowerCase()
        .includes(term)
    );
  }

  return filtered;
}, [
  jobs,
  selectedFolder,
  selectedStatus,
  search,
]);

  async function moveJobUp(id: number) {
  setJobs((previous) => {
    const jobs = [...previous];
    const index = jobs.findIndex((j) => j.id === id);

    if (index <= 0) return jobs;

    [jobs[index - 1], jobs[index]] =
      [jobs[index], jobs[index - 1]];

    return jobs;
  });
}

async function moveJobDown(id: number) {
  setJobs((previous) => {
    const jobs = [...previous];
    const index = jobs.findIndex((j) => j.id === id);

    if (index === -1 || index === jobs.length - 1)
      return jobs;

    [jobs[index], jobs[index + 1]] =
      [jobs[index + 1], jobs[index]];

    return jobs;
  });
}

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600 font-medium">
          Loading applications...
        </p>
      </main>
    );
  }

return (
  <main className="min-h-screen bg-[#f4f8ff] py-8">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-950">
          Applications
        </h1>

        <p className="mt-2 text-lg text-slate-600">
          Track jobs, internships, interviews, and offers.
        </p>
      </div>

      {/* Add Application */}
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <JobForm
          folders={folders}
          onAddJob={addJob}
        />
      </div>

<div className="flex justify-center mb-6">
  <SearchBar
    value={search}
    onChange={setSearch}
    placeholder="Search company or position..."
  />
</div>

      {/* Folder Section */}
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
          Folders
        </h2>

        <FolderSidebar
          folders={folders}
          selectedFolder={selectedFolder}
          onSelect={setSelectedFolder}
          onCreate={createFolder}
          onDelete={deleteFolder}
          onToggleCollapse={toggleCollapse}
        />
      </div>

<div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
  <FilterBar
    title="Filter by Status"
    options={JOB_STATUSES}
    value={selectedStatus}
    onChange={setSelectedStatus}
  />
</div>

      {/* Edit Job */}
      {editingJob && (
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <EditJobForm
            job={editingJob}
            folders={folders}
            onSave={saveEditedJob}
            onCancel={() => setEditingJob(null)}
          />
        </div>
      )}

{/* Applications Header */}
<div className="flex justify-center">
  <div className="text-center">
    <h2 className="text-3xl font-bold text-slate-900">
      {selectedFolder === null
        ? "All Applications"
        : folders.find((folder) => folder.id === selectedFolder)?.name}
    </h2>

    <p className="mt-2 text-slate-500">
      {displayedJobs.length} application
      {displayedJobs.length !== 1 ? "s" : ""}
    </p>
  </div>
</div>

      {/* Applications */}
      {displayedJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blue-200 bg-white p-12 text-center">
          <h3 className="text-2xl font-bold text-slate-900">
            No applications found
          </h3>

          <p className="mt-3 text-slate-500">
            Add a new application or create a folder above.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {displayedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
                contacts={contacts}
                  tasks={tasks}
  materials={materials}
              onDelete={deleteJob}
              onEdit={setEditingJob}
                onArchive={archiveJob}
                onMoveUp={moveJobUp}
                onMoveDown={moveJobDown}
                
            />
          ))}
        </div>
      )}
    </div>
  </main>
);
}