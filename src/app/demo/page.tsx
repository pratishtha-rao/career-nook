"use client";

import DemoJobs from "@/components/demo/DemoJobs";
import DemoContacts from "@/components/demo/DemoContact";
import DemoTasks from "@/components/demo/DemoTasks";
import DemoMaterials from "@/components/demo/DemoMaterials";


export default function DemoPage(){

return (

<main className="
min-h-screen
bg-[#f5f9ff]
">


<div className="
mx-auto
max-w-7xl
px-8
py-12
">


<div className="
rounded-2xl
bg-blue-600
p-8
shadow-lg
text-white
">


<h1 className="
font-header
text-4xl
font-bold
">

Try Career Nook

</h1>



<p className="
mt-3
max-w-3xl
text-lg
text-blue-100
">

This demo lets you organize jobs, contacts, tasks, and materials.
Create an account to unlock more features and save your data.

</p>


</div>





<div className="
mt-10
grid
gap-8
">


<div>

<DemoJobs/>

</div>



<div>

<DemoContacts/>

</div>



<div>

<DemoTasks/>

</div>



<div>

<DemoMaterials/>

</div>




<div className="
rounded-2xl
border
border-blue-100
bg-white
p-8
text-center
shadow-sm
">


<p className="
text-slate-700
">

Enjoying Career Nook?

</p>



<a

href="/signup"

className="
mt-3
inline-block
font-semibold
text-blue-600
hover:text-blue-800
hover:underline
"

>

Create an account and save your data →

</a>



</div>



</div>



</div>


</main>

);

}