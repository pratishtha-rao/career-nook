import { Material } from "@/types/Material";

type Props = {
  material: Material;

  onEdit: (material: Material) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
};

export default function MaterialCard({
  material,
  onEdit,
  onDelete,
  onArchive,
}: Props) {
  return (
    <div
      className="
        w-full rounded-xl border border-blue-100
        bg-white p-4 shadow-sm transition
        hover:-translate-y-1 hover:shadow-lg
        sm:p-6
      "
    >
      {/* Header */}

      <div
        className="
          flex flex-col gap-3
          sm:flex-row sm:items-start
          sm:justify-between
        "
      >
        <div>
          <h2
            className="
              break-words text-xl font-bold
              text-slate-900
            "
          >
            {material.name}
          </h2>

          <p
            className="
              mt-2 text-sm font-medium
              text-blue-600 break-words
            "
          >
            {material.type}
          </p>
        </div>

        <div
          className="
            w-fit rounded bg-blue-50
            px-3 py-1 text-xs
            font-semibold text-blue-600
          "
        >
          Material
        </div>
      </div>

      {/* Description */}

      {material.description && (
        <p
          className="
            mt-5 break-words
            leading-relaxed text-slate-600
          "
        >
          {material.description}
        </p>
      )}

      {/* Link */}

      {material.link && (
        <a
          href={
            material.link.startsWith("http")
              ? material.link
              : `https://${material.link}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-4 block break-all
            text-sm font-medium
            text-blue-600 transition
            hover:text-blue-700 hover:underline
          "
        >
          Open Resource →
        </a>
      )}

      {/* Actions */}

      <div
        className="
          mt-6 flex flex-col
          gap-2
        "
      >
        <button
          onClick={() => onEdit(material)}
          className="bg-blue-800 
          text-white text-slate-700 
          hover:bg-blue-900"
        >
          Edit
        </button>

        <button
          onClick={() => onArchive(material.id)}
          className="
            border border-yellow-300 bg-yellow-600 px-5 py-2 text-black-700 hover:bg-yellow-700
          "
        >
          Archive
        </button>

        <button
          onClick={() => onDelete(material.id)}
          className="
            bg-red-800 text-white hover:bg-red-600
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}