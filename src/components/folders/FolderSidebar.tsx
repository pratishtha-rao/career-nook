"use client";

import type { Folder } from "@/types/Folder";
import { useState } from "react";

type Props = {
  folders: Folder[];
  selectedFolder: number | null;
  onSelect(id: number | null): void;
  onCreate(name: string): void;
  onDelete(id: number): void;
  onToggleCollapse(folder: Folder): void;
};

export default function FolderSidebar({
  folders,
  selectedFolder,
  onSelect,
  onCreate,
    onDelete,
  onToggleCollapse,

}: Props) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = name.trim();

    if (!trimmed) return;

    onCreate(trimmed);
    setName("");
  }

  return (
    <div className="w-full">
      {/* Create Folder */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex justify-center gap-3"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New folder..."
          className="w-72 rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          + Add Folder
        </button>
      </form>

      {/* Horizontal Folder List */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => onSelect(null)}
          className={`rounded-full border px-5 py-2 transition ${
            selectedFolder === null
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-300 bg-white hover:bg-slate-100"
          }`}
        >
          📂 All
        </button>

{folders.map((folder) => (
  <div
    key={folder.id}
    className={`flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm transition ${
      selectedFolder === folder.id
        ? "border-blue-600 bg-blue-600 text-white"
        : "border-slate-300 bg-white hover:bg-slate-100"
    }`}
  >
    <button
      type="button"
      onClick={() => onSelect(folder.id)}
      className="flex items-center gap-2"
    >
      <span
        className="h-3 w-3 rounded-full border border-white/30"
        style={{
          backgroundColor: folder.color ?? "#2563eb",
        }}
      />

      {folder.icon ?? "📁"} {folder.name}
    </button>

    <button
      type="button"
      onClick={() => onDelete(folder.id)}
      className={`ml-1 rounded-full px-2 transition ${
        selectedFolder === folder.id
          ? "hover:bg-white/20"
          : "hover:bg-red-100"
      }`}
    >
      ✕
    </button>
  </div>
        ))}
      </div>
    </div>
  );
}