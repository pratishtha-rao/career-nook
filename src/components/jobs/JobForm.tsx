"use client";

import { useState } from "react";

import { JOB_STATUSES } from "@/constants/job-statuses";

import type { Folder } from "@/types/Folder";

import {
  CreateJob,
  OfficeType,
} from "@/types/Job";

import type { JobStatus } from "@/constants/job-statuses";

type Props = {
  folders: Folder[];
  onAddJob: (job: CreateJob) => void;
};

export default function JobForm({
  folders,
  onAddJob,
}: Props) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  const [status, setStatus] =
    useState<JobStatus>("Applied");

  const [dateApplied, setDateApplied] =
    useState("");

  const [salary, setSalary] =
    useState("");

  const [salaryNotes, setSalaryNotes] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [officeType, setOfficeType] =
    useState<OfficeType | "">("");

  const [url, setUrl] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [referredBy, setReferredBy] =
    useState("");

  const [folderIds, setFolderIds] =
    useState<number[]>([]);

  function toggleFolder(id: number) {
    setFolderIds((previous) =>
      previous.includes(id)
        ? previous.filter(
            (folderId) => folderId !== id
          )
        : [...previous, id]
    );
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    onAddJob({
      company,
      position,
      status,
      dateApplied,
      salary,
      salaryNotes,
      location,
      officeType:
        officeType || undefined,
      url,
      description,
      notes,
      referredBy,
      folderIds,
    });

    setCompany("");
    setPosition("");
    setStatus("Applied");
    setDateApplied("");
    setSalary("");
    setSalaryNotes("");
    setLocation("");
    setOfficeType("");
    setUrl("");
    setDescription("");
    setNotes("");
    setReferredBy("");
    setFolderIds([]);
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Add Application
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          className={inputClass}
          placeholder="Company"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          required
        />

        <input
          className={inputClass}
          placeholder="Position"
          value={position}
          onChange={(e) =>
            setPosition(e.target.value)
          }
          required
        />

        <select
          className={inputClass}
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as JobStatus
            )
          }
        >
          {JOB_STATUSES.map(
            (jobStatus: JobStatus) => (
              <option
                key={jobStatus}
                value={jobStatus}
              >
                {jobStatus}
              </option>
            )
          )}
        </select>

        <input
          type="date"
          className={inputClass}
          value={dateApplied}
          onChange={(e) =>
            setDateApplied(e.target.value)
          }
          required
        />

        <input
          className={inputClass}
          placeholder="Salary (ex. $95k, $35/hr)"
          value={salary}
          onChange={(e) =>
            setSalary(e.target.value)
          }
        />

        <input
          className={inputClass}
          placeholder="Salary Notes"
          value={salaryNotes}
          onChange={(e) =>
            setSalaryNotes(e.target.value)
          }
        />

        <input
          className={inputClass}
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />

        <select
          className={inputClass}
          value={officeType}
          onChange={(e) =>
            setOfficeType(
              e.target.value as OfficeType
            )
          }
        >
          <option value="">
            Office Type
          </option>

          <option value="REMOTE">
            Remote
          </option>

          <option value="HYBRID">
            Hybrid
          </option>

          <option value="ONSITE">
            On-site
          </option>
        </select>

        <input
          className={inputClass}
          placeholder="Referred By"
          value={referredBy}
          onChange={(e) =>
            setReferredBy(e.target.value)
          }
        />

        <input
          className={inputClass}
          placeholder="Job URL"
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
        />
      </div>

      {folders.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 font-semibold">
            Folders
          </h3>

          <div className="grid gap-2 md:grid-cols-2">
            {folders.map((folder) => (
              <label
                key={folder.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={folderIds.includes(
                    folder.id
                  )}
                  onChange={() =>
                    toggleFolder(folder.id)
                  }
                />

                <span>{folder.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <textarea
        className="mt-6 h-32 w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        placeholder="Job Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <textarea
        className="mt-4 h-32 w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        placeholder="Notes"
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
      />

      <button
        type="submit"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Add Application
      </button>
    </form>
  );
}