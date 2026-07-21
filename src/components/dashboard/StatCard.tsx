type Props = {

title:string;

value:number | string;

};


export default function StatCard({

title,

value,

}:Props){


return (

<div
className="
rounded-xl
border
bg-white
p-6
shadow-sm
"
>


<p className="
text-sm
text-slate-500
">

{title}

</p>


<h2 className="
mt-3
text-3xl
font-bold
text-black
">

{value}

</h2>


</div>

);


}