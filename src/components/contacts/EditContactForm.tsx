"use client";

import { useState } from "react";

import type { Folder } from "@/types/Folder";
import {
  Contact,
  ContactType,
} from "@/types/Contact";

type Props = {
  contact: Contact;
  folders: Folder[];

  onSave: (contact: Contact) => void;
  onCancel: () => void;
};

export default function EditContactForm({
  contact,
  folders,
  onSave,
  onCancel,
}: Props) {
  const [name, setName] = useState(contact.name);
  const [company, setCompany] = useState(contact.company);
  const [role, setRole] = useState(contact.role);
  const [type, setType] =
    useState<ContactType>(contact.type);

  const [email, setEmail] = useState(
    contact.email ?? ""
  );

  const [phone, setPhone] = useState(
    contact.phone ?? ""
  );

  const [linkedin, setLinkedin] = useState(
    contact.linkedin ?? ""
  );

  const [location, setLocation] = useState(
    contact.location ?? ""
  );

  const [notes, setNotes] = useState(
    contact.notes ?? ""
  );

  const [selectedFolders, setSelectedFolders] =
    useState<number[]>(
      contact.folderContacts.map(
        (item) => item.folderId
      )
    );

  function toggleFolder(id: number) {
    setSelectedFolders((current) =>
      current.includes(id)
        ? current.filter(
            (folderId) => folderId !== id
          )
        : [...current, id]
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    onSave({
      ...contact,

      name,
      company,
      role,
      type,

      email,
      phone,
      linkedin,
      location,
      notes,

      folderIds: selectedFolders,
    } as Contact);
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Edit Contact
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
        />

        <input
          placeholder="Company"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          className="rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
        />

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value as ContactType)
          }
          className="rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
        >
          <option>Recruiter</option>
          <option>Hiring Manager</option>
          <option>Employee</option>
          <option>Mentor</option>
          <option>Other</option>
        </select>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
        />

        <input
          placeholder="LinkedIn URL"
          value={linkedin}
          onChange={(e) =>
            setLinkedin(e.target.value)
          }
          className="rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          className="rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-slate-700">
          Folders
        </p>

        <div className="flex flex-wrap gap-2">
          {folders.map((folder) => (
            <label
              key={folder.id}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedFolders.includes(
                  folder.id
                )}
                onChange={() =>
                  toggleFolder(folder.id)
                }
              />

              {folder.name}
            </label>
          ))}
        </div>
      </div>
            <div className="mt-6">
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          className="h-32 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}