export default function ArchivePage(){


return (

<main className="
min-h-screen
bg-slate-100
">


<div className="
mx-auto
max-w-6xl
px-8
py-12
">


<h1 className="
text-4xl
font-bold
">

Archive

</h1>


<p className="
mt-3
text-slate-600
">

Your archived career items.

</p>



<div className="
mt-10
space-y-6
">


<ArchiveSection

title="Archived Jobs"

/>


<ArchiveSection

title="Archived Tasks"

/>


<ArchiveSection

title="Archived Contacts"

/>


<ArchiveSection

title="Archived Materials"

/>



</div>



</div>


</main>

);


}





function ArchiveSection({

title

}:{

title:string;

}){


return (

<details className="
rounded-xl
border
bg-white
p-6
shadow-sm
">


<summary className="
cursor-pointer
text-xl
font-bold
">

{title}

</summary>



<p className="
mt-4
text-slate-500
">

No archived items yet.

</p>



</details>

);


}