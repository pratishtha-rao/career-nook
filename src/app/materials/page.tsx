"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import MaterialCard from "@/components/materials/MaterialCard";
import MaterialForm from "@/components/materials/MaterialForm";
import EditMaterialForm from "@/components/materials/EditMaterialForm";
import SearchBar from "@/components/common/SearchBar";
import { useSearchParams } from "next/navigation";

import type {
  Material,
  CreateMaterial,
} from "@/types/Material";

export default function MaterialsPage() {
  const router = useRouter();

  const [materials, setMaterials] = useState<Material[]>([]);
  const [editingMaterial, setEditingMaterial] =
    useState<Material | null>(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

const selectedMaterial =
  searchParams.get("material");

  
  useEffect(() => {
    void loadMaterials();
  }, []);

  async function loadMaterials() {
    try {
      const response = await fetch("/api/materials", {
        cache: "no-store",
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        setMaterials([]);
        return;
      }

      setMaterials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed loading materials:", error);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  }

  async function addMaterial(
    material: CreateMaterial
  ) {
    const response = await fetch("/api/materials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(material),
    });

    if (!response.ok) return;

    await loadMaterials();
  }

  async function deleteMaterial(id: number) {
    const response = await fetch(
      `/api/materials/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) return;

    await loadMaterials();
  }

  async function saveEditedMaterial(
    material: Material
  ) {
    const response = await fetch(
      `/api/materials/${material.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(material),
      }
    );

    if (!response.ok) return;

    await loadMaterials();
    setEditingMaterial(null);
  }

  async function archiveMaterial(id: number) {
  const response = await fetch(
    `/api/materials/archived/${id}`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) return;

  await loadMaterials();
}

const displayedMaterials = useMemo(() => {
  let filtered = materials;

  if (search.trim()) {
    const term = search.toLowerCase();

    filtered = filtered.filter((material) =>
      `${material.name}
       ${material.type}
       ${material.description ?? ""}
       ${material.link ?? ""}`
        .toLowerCase()
        .includes(term)
    );
  }

  return filtered;
}, [materials, search]);

useEffect(() => {
  if (!selectedMaterial) return;

  const element = document.getElementById(
    `material-${selectedMaterial}`
  );

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}, [selectedMaterial, displayedMaterials]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f9ff]">
        <p className="text-lg text-slate-700">
          Loading materials...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f9ff] py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-950">
            Application Materials
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            Manage resumes, cover letters,
            portfolios, and other application
            materials.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <MaterialForm
            onAddMaterial={addMaterial}
          />
        </div>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search materials..."
        />

        {editingMaterial && (
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <EditMaterialForm
              material={editingMaterial}
              onSave={saveEditedMaterial}
              onCancel={() =>
                setEditingMaterial(null)
              }
            />
          </div>
        )}

        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Materials
            </h2>

            <p className="mt-1 text-slate-500">
              {displayedMaterials.length} material
              {displayedMaterials.length !== 1 &&
                "s"}
            </p>
          </div>
        </div>

        {displayedMaterials.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-white p-12 text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              No materials found
            </h3>

            <p className="mt-3 text-slate-500">
              Add a material or adjust your
              search.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
{displayedMaterials.map((material) => (
  <div
    key={material.id}
    id={`material-${material.id}`}
  >
    <MaterialCard
      material={material}
      onEdit={setEditingMaterial}
      onDelete={deleteMaterial}
      onArchive={archiveMaterial}
    />
  </div>
))}
          </div>
        )}
      </div>
    </main>
  );
}