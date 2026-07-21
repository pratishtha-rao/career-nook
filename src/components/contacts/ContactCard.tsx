import { Contact } from "@/types/Contact";


type Props = {
  contact: Contact;
};


export default function ContactCard({
  contact,
}: Props) {

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">


      <div className="flex justify-between">


        <div>

          <h2 className="text-xl font-bold">
            {contact.name}
          </h2>


          <p className="text-slate-600">
            {contact.role}
          </p>


          <p className="text-slate-500">
            {contact.company}
          </p>

        </div>


        <span
          className="
          rounded-full
          bg-purple-100
          px-3
          py-1
          text-sm
          text-purple-700
          "
        >
          {contact.type}
        </span>


      </div>



      {contact.email && (

        <p className="mt-4 text-sm text-slate-600">
          {contact.email}
        </p>

      )}



      {contact.notes && (

        <p className="mt-3 text-sm text-slate-500">
          {contact.notes}
        </p>

      )}


    </div>

  );
}