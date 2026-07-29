import { Contact } from "@/types/Contact";
import Button from "@/components/ui/Button";

type Props = {
  contact: Contact;

  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
};

function typeColor(type: string) {
  switch (type) {
    case "Recruiter":
      return "bg-blue-100 text-blue-700 border-blue-200";

    case "Hiring Manager":
      return "bg-purple-100 text-purple-700 border-purple-200";

    case "Employee":
      return "bg-green-100 text-green-700 border-green-200";

    case "Mentor":
      return "bg-amber-100 text-amber-700 border-amber-200";

    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export default function ContactCard({
  contact,
  onEdit,
  onDelete,
    onArchive,
  onMoveUp,
  onMoveDown,
}: Props) {
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
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900">
              {contact.name}
            </h2>

            <span
              className={`
                rounded-full
                border
                px-3
                py-1
                text-xs
                font-semibold
                ${typeColor(contact.type)}
              `}
            >
              {contact.type}
            </span>
          </div>

          <p className="mt-1 text-slate-700">
            {contact.role}
          </p>

          <p className="text-slate-500">
            {contact.company}
          </p>
        </div>

        <div className="flex gap-2">
          {onMoveUp && (
            <Button
              onClick={onMoveUp}
              className="border bg-white px-3"
            >
              ▲
            </Button>
          )}

          {onMoveDown && (
            <Button
              onClick={onMoveDown}
              className="border bg-white px-3"
            >
              ▼
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-700">
        {contact.email && (
          <p>
            <span className="font-medium">
              Email:
            </span>{" "}
            {contact.email}
          </p>
        )}

        {contact.phone && (
          <p>
            <span className="font-medium">
              Phone:
            </span>{" "}
            {contact.phone}
          </p>
        )}

        {contact.linkedin && (
          <p>
            <span className="font-medium">
              LinkedIn:
            </span>{" "}
            {contact.linkedin}
          </p>
        )}

        {contact.location && (
          <p>
            <span className="font-medium">
              Location:
            </span>{" "}
            {contact.location}
          </p>
        )}
                {contact.website && (
          <p>
            <span className="font-medium">
              Website:
            </span>{" "}
            {contact.website}
          </p>
        )}

        {contact.twitter && (
          <p>
            <span className="font-medium">
              Twitter:
            </span>{" "}
            {contact.twitter}
          </p>
        )}

        {contact.referredBy && (
          <p>
            <span className="font-medium">
              Referred By:
            </span>{" "}
            {contact.referredBy}
          </p>
        )}

        {contact.relationship && (
          <p>
            <span className="font-medium">
              Relationship:
            </span>{" "}
            {contact.relationship}
          </p>
        )}

        {contact.lastContact && (
          <p>
            <span className="font-medium">
              Last Contact:
            </span>{" "}
            {new Date(contact.lastContact).toLocaleDateString()}
          </p>
        )}

        {contact.nextFollowUp && (
          <p>
            <span className="font-medium">
              Next Follow Up:
            </span>{" "}
            {new Date(contact.nextFollowUp).toLocaleDateString()}
          </p>
        )}
      </div>

      {contact.folderContacts.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase text-slate-500">
            Folder
            {contact.folderContacts.length > 1 ? "s" : ""}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {contact.folderContacts.map((item) => (
              <span
                key={item.folderId}
                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
              >
                {item.folder.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {contact.notes && (
        <div className="mt-5">
          <h3 className="font-semibold text-slate-900">
            Notes
          </h3>

          <div className="mt-2 whitespace-pre-wrap rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 text-sm">
            {contact.notes}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          onClick={() => onEdit(contact)}
          className="border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
        >
          Edit
        </Button>

<Button
  onClick={() => onArchive(contact.id)}
  className="border border-yellow-300 bg-white text-yellow-700 hover:bg-yellow-50"
>
  Archive
</Button>

        <Button
          onClick={() => onDelete(contact.id)}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}