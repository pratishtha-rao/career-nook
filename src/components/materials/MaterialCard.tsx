import { Material } from "@/types/Material";


type Props = {
  material: Material;
};


export default function MaterialCard({
  material,
}: Props) {

  return (

    <div className="
      rounded-xl
      border
      bg-white
      p-6
      shadow-sm
    ">


      <div className="flex justify-between">


        <div>

          <h2 className="text-xl font-bold">
            {material.title}
          </h2>


          <p className="mt-2 text-slate-600">
            {material.description}
          </p>

        </div>


        <span className="
          rounded-full
          bg-blue-100
          px-3
          py-1
          text-sm
          text-blue-700
        ">
          {material.type}
        </span>


      </div>



      {material.link && (

        <a
          href={material.link}
          target="_blank"
          className="
          mt-4
          block
          text-blue-600
          hover:underline
          "
        >
          Open Link
        </a>

      )}


    </div>

  );
}