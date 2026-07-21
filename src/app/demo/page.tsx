"use client";

import DemoJobs from "@/components/demo/DemoJobs";
import DemoContacts from "@/components/demo/DemoContact";
import DemoTasks from "@/components/demo/DemoTasks";
import DemoMaterials from "@/components/demo/DemoMaterials";


export default function DemoPage(){


return (

<main className="
min-h-screen
bg-slate-100
">


<div className="
mx-auto
max-w-7xl
px-8
py-12
">


<div className="
rounded-xl
bg-blue-600
text-white
p-6
">

<h1 className="
text-3xl
font-bold
">

Try Career Nook

</h1>


<p className="
mt-2
">

This demo lets you organize jobs, contacts, tasks, and materials.
Create an account to permanently save your information.

</p>


</div>



<div className="
mt-10
grid
gap-8
">

<DemoJobs/>

<DemoContacts/>

<DemoTasks/>

<DemoMaterials/>

<div className="
mt-10
text-center
">

<p>
Enjoying Career Nook?
</p>


<a
href="/signup"
className="
text-blue-600
font-bold
"
>
Create an account and save your data
</a>


</div>

</div>


</div>


</main>

);

}