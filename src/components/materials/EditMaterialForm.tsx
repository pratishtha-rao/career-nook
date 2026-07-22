"use client";

import { useState } from "react";

import {
  Material,
  MaterialType,
} from "@/types/Material";


type Props = {

  material: Material;

  onSave: (material: Material) => void;

  onCancel: () => void;

};



export default function EditMaterialForm({

  material,

  onSave,

  onCancel,

}: Props) {


  const [name, setName] = useState(material.name);

  const [type, setType] = useState<MaterialType>(
    material.type
  );

  const [description, setDescription] = useState(
    material.description ?? ""
  );

  const [link, setLink] = useState(
    material.link ?? ""
  );



  function submit(e: React.FormEvent) {

    e.preventDefault();


    onSave({

      ...material,

      name,

      type,

      description,

      link,

    });

  }



  return (

    <form

      onSubmit={submit}

      className="
        border
        border-blue-100
        bg-white
        p-6
        shadow-sm
      "

    >


      <div className="
        mb-6
        flex
        items-center
        justify-between
      ">


        <h2 className="
          text-2xl
          font-bold
          text-slate-900
        ">
          Edit Material
        </h2>


        <span className="
          bg-blue-50
          px-3
          py-1
          text-sm
          font-medium
          text-blue-600
        ">
          Update
        </span>


      </div>




      <div className="
        grid
        gap-4
      ">


        <input

          value={name}

          onChange={(e)=>setName(e.target.value)}

          placeholder="Material name"

          className="
            border
            border-slate-200
            p-3
            outline-none
            focus:border-blue-500
          "

        />



        <select

          value={type}

          onChange={(e)=>
            setType(
              e.target.value as MaterialType
            )
          }

          className="
            border
            border-slate-200
            p-3
            outline-none
            focus:border-blue-500
          "

        >

          <option>
            Resume
          </option>

          <option>
            Cover Letter
          </option>

          <option>
            Portfolio
          </option>

          <option>
            Other
          </option>

        </select>





        <textarea

          value={description}

          onChange={(e)=>setDescription(e.target.value)}

          placeholder="Description"

          className="
            min-h-[120px]
            border
            border-slate-200
            p-3
            outline-none
            focus:border-blue-500
          "

        />





        <input

          value={link}

          onChange={(e)=>setLink(e.target.value)}

          placeholder="Resource URL"

          className="
            border
            border-slate-200
            p-3
            outline-none
            focus:border-blue-500
          "

        />


      </div>





      <div className="
        mt-6
        flex
        gap-3
      ">


        <button

          type="submit"

          className="
            bg-blue-600
            px-7
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "

        >

          Save Changes

        </button>



        <button

          type="button"

          onClick={onCancel}

          className="
            border
            border-slate-300
            px-7
            py-3
            font-semibold
            text-slate-700
            hover:border-blue-500
            hover:text-blue-600
          "

        >

          Cancel

        </button>


      </div>


    </form>

  );

}
