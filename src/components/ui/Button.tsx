type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};


export default function Button({
  children,
  onClick,
  className = "",
}: Props) {


return (

<button
onClick={onClick}
className={`
rounded-lg
px-4
py-2
text-sm
font-semibold
${className}
`}
>

{children}

</button>

);


}