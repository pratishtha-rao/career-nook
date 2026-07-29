"use client";

import { useState } from "react";

import { JOB_STATUSES } from "@/constants/job-statuses";

import type { Folder } from "@/types/Folder";
import type { Contact } from "@/types/Contact";

import {
  Job,
  OfficeType,
  UpdateJob,
} from "@/types/Job";

import type { JobStatus } from "@/constants/job-statuses";

type Props = {
  job: Job;
  folders: Folder[];
  onSave: (job: UpdateJob) => void;
  onCancel: () => void;
};

export default function EditJobForm({
  job,
  folders,
  onSave,
  onCancel,
}: Props) {
  const [company, setCompany] = useState(job.company);
  const [position, setPosition] = useState(job.position);

  const [status, setStatus] =
    useState<JobStatus>(job.status);

  const [dateApplied, setDateApplied] =
    useState(job.dateApplied);

  const [salary, setSalary] =
    useState(job.salary ?? "");

  const [salaryNotes, setSalaryNotes] =
    useState(job.salaryNotes ?? "");

  const [location, setLocation] =
    useState(job.location ?? "");

  const [officeType, setOfficeType] =
    useState<OfficeType | "">(
      job.officeType ?? ""
    );

  const [url, setUrl] =
    useState(job.url ?? "");

  const [description, setDescription] =
    useState(job.description ?? "");

  const [notes, setNotes] =
    useState(job.notes ?? "");

  const [referredBy, setReferredBy] =
    useState(job.referredBy ?? "");

  const [folderIds, setFolderIds] =
    useState<number[]>(
      job.folders.map(
        (folder) => folder.folderId
      )
    );

  function toggleFolder(id: number) {
    setFolderIds((previous) =>
      previous.includes(id)
        ? previous.filter(
            (folderId) =>
              folderId !== id
          )
        : [...previous, id]
    );
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    onSave({
      ...job,
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
  }

  const inputStyle =
    "w-full rounded-lg border border-blue-100 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-7 shadow-sm"
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Update Opportunity
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Edit Application
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Modify company details,
            progress, and notes.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center bg-blue-600 font-bold text-white">
          ✎
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <input
          className={inputStyle}
          placeholder="Company"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
        />

        <input
          className={inputStyle}
          placeholder="Position"
          value={position}
          onChange={(e) =>
            setPosition(e.target.value)
          }
        />

        <select
          className={inputStyle}
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as JobStatus
            )
          }
        >
          {JOB_STATUSES.map(
            (
              jobStatus: JobStatus
            ) => (
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
          className={inputStyle}
          value={dateApplied}
          onChange={(e) =>
            setDateApplied(
              e.target.value
            )
          }
        />

        <input
          className={inputStyle}
          placeholder="Salary"
          value={salary}
          onChange={(e) =>
            setSalary(e.target.value)
          }
        />

        <input
          className={inputStyle}
          placeholder="Salary Notes"
          value={salaryNotes}
          onChange={(e) =>
            setSalaryNotes(
              e.target.value
            )
          }
        />

        <input
          className={inputStyle}
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(
              e.target.value
            )
          }
        />

        <select
          className={inputStyle}
          value={officeType}
          onChange={(e) =>
            setOfficeType(
              e.target
                .value as OfficeType
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
          className={inputStyle}
          placeholder="Referred By"
          value={referredBy}
          onChange={(e) =>
            setReferredBy(
              e.target.value
            )
          }
        />

        <input
          className={inputStyle}
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
                    toggleFolder(
                      folder.id
                    )
                  }
                />

                <span>
                  {folder.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <textarea
        className="mt-5 h-32 w-full rounded-lg border border-blue-100 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        placeholder="Job Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
      />

      <textarea
        className="mt-5 h-32 w-full rounded-lg border border-blue-100 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        placeholder="Notes"
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
      />

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 bg-white px-8 py-3 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}