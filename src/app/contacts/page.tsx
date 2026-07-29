"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import ContactCard from "@/components/contacts/ContactCard";
import ContactForm from "@/components/contacts/ContactForm";
import EditContactForm from "@/components/contacts/EditContactForm";
import FolderSidebar from "@/components/folders/FolderSidebar";
import SearchBar from "@/components/common/SearchBar";

import { useSearchParams } from "next/navigation";

import type {
  Contact,
  CreateContact,
} from "@/types/Contact";

import type { Folder } from "@/types/Folder";

export default function ContactsPage() {
  const router = useRouter();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);

  const searchParams = useSearchParams();

const selectedContact = searchParams.get("contact");

  const [search, setSearch] = useState("");

  const [selectedFolder, setSelectedFolder] =
    useState<number | null>(null);

  const [editingContact, setEditingContact] =
    useState<Contact | null>(null);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  void loadContacts();
  void loadFolders();
}, []);

  async function loadContacts() {
    try {
      const response = await fetch("/api/contacts", {
        cache: "no-store",
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      const data = await response.json();

      setContacts(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }

  async function loadFolders() {
    try {
      const response = await fetch("/api/folders");

      if (!response.ok) return;

      const data = await response.json();

      setFolders(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function createFolder(name: string) {
    const response = await fetch("/api/folders", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) return;

    const folder: Folder =
      await response.json();

    setFolders((previous) => [
      ...previous,
      folder,
    ]);
  }

  async function deleteFolder(id: number) {
    const response = await fetch(
      `/api/folders/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) return;

    setFolders((previous) =>
      previous.filter(
        (folder) => folder.id !== id
      )
    );

    if (selectedFolder === id) {
      setSelectedFolder(null);
    }
  }

  async function archiveContact(id: number) {
  const response = await fetch(
    `/api/contacts/archived/${id}`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) return;

  await loadContacts();
}

  async function toggleCollapse(
    folder: Folder
  ) {
    const response = await fetch(
      `/api/folders/${folder.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          collapsed:
            !folder.collapsed,
        }),
      }
    );

    if (!response.ok) return;

    const updated: Folder =
      await response.json();

    setFolders((previous) =>
      previous.map((item) =>
        item.id === updated.id
          ? updated
          : item
      )
    );
  }

async function addContact(contact: CreateContact) {
  const response = await fetch("/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  if (!response.ok) return;

  await response.json();

  await loadContacts();
}

  async function deleteContact(
    id: number
  ) {
    const response = await fetch(
      `/api/contacts/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) return;

await response.json();

await loadContacts();

}

async function saveEditedContact(contact: Contact) {
  const response = await fetch(
    `/api/contacts/${contact.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    }
  );

  if (!response.ok) return;

  await loadContacts();
  setEditingContact(null);
}

  async function moveContact(
    id: number,
    direction: "up" | "down"
  ) {
    const response = await fetch(
      `/api/contacts/${id}/move`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          direction,
        }),
      }
    );

    if (!response.ok) return;

    loadContacts();
  }

const displayedContacts = useMemo(() => {
  let filtered = contacts;

  // Folder filter
  if (selectedFolder !== null) {
    filtered = filtered.filter((contact) =>
      contact.folderContacts.some(
        (folder) => folder.folderId === selectedFolder
      )
    );
  }

  // Search filter
  if (search.trim()) {
    const term = search.toLowerCase();

    filtered = filtered.filter((contact) =>
      `${contact.name}
       ${contact.company}
       ${contact.role}
       ${contact.email ?? ""}
       ${contact.location ?? ""}
       ${contact.type}`
        .toLowerCase()
        .includes(term)
    );
  }

  return filtered;
}, [contacts, selectedFolder, search]);

  useEffect(() => {
  if (!selectedContact) return;

  const element = document.getElementById(
    `contact-${selectedContact}`
  );

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}, [selectedContact, displayedContacts]);


if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f9ff]">
        <p className="text-slate-600 font-medium">
          Loading contacts...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f9ff] py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6">

        {/* Header */}

        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-950">
            Contacts
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            Manage recruiters, mentors, referrals, and professional relationships.
          </p>
        </div>

        {/* Add Contact */}

        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <ContactForm
            folders={folders}
            onAddContact={addContact}
          />
        </div>

<SearchBar
  value={search}
  onChange={setSearch}
  placeholder="Search contacts..."
/>

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

        {/* Edit Contact */}

        {editingContact && (
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <EditContactForm
              contact={editingContact}
              folders={folders}
              onSave={saveEditedContact}
              onCancel={() =>
                setEditingContact(null)
              }
            />
          </div>
        )}

        {/* Contacts Header */}

        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {selectedFolder === null
                ? "All Contacts"
                : folders.find(
                    (folder) =>
                      folder.id === selectedFolder
                  )?.name ?? "Folder"}
            </h2>

            <p className="mt-1 text-slate-500">
              {displayedContacts.length} contact
              {displayedContacts.length !== 1 &&
                "s"}
            </p>
          </div>
        </div>
                {/* Contacts */}

        {displayedContacts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-white p-12 text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              No contacts found
            </h3>

            <p className="mt-3 text-slate-500">
              Add a new contact or create a folder above.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
{displayedContacts.map((contact, index) => (
  <div
    key={contact.id}
    id={`contact-${contact.id}`}
  >
    <ContactCard
      contact={contact}
      onEdit={setEditingContact}
      onDelete={deleteContact}
      onArchive={archiveContact}
      onMoveUp={
        index > 0
          ? () => moveContact(contact.id, "up")
          : undefined
      }
      onMoveDown={
        index < displayedContacts.length - 1
          ? () => moveContact(contact.id, "down")
          : undefined
      }
    />
  </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}