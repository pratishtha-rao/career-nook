type CardProps = {
  title: string;
  description: string;
};


export default function Card({
  title,
  description,
}: CardProps) {

  return (
    <div className="
      rounded-2xl
      border
      bg-white
      p-6
      shadow-sm
      transition
      hover:shadow-md
    ">

      <h2 className="mb-3 text-xl font-bold">
        {title}
      </h2>

      <p className="text-slate-600">
        {description}
      </p>

    </div>
  );
}