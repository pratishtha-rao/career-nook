"use client";


import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import StatCard from "@/components/dashboard/StatCard";

type DashboardData = {

totalJobs:number;

applied:number;

interviews:number;

offers:number;

rejected:number;

interviewRate:number;


totalTasks:number;

completedTasks:number;

remainingTasks:number;


totalMaterials:number;

resumes:number;

coverLetters:number;

portfolios:number;


recentJobs:{
  id:number;
  company:string;
  position:string;
  status:string;
  dateApplied:string;
  createdAt:string;
}[];

};



export default function DashboardPage(){


const [stats,setStats] = useState<DashboardData | null>(null);
const router = useRouter();

const [loading,setLoading] = useState(true);



useEffect(() => {

  async function loadDashboard() {

    const response = await fetch("/api/dashboard");

    const data = await response.json();

    if (response.status === 401) {

      router.push("/login");

      return;

    }

    if (!response.ok) {

      console.error(data);

      setStats(null);

      setLoading(false);

      return;

    }

    setStats(data);

    setLoading(false);

  }

  loadDashboard();

}, [router]);



if(loading){

return (

<main className="
min-h-screen
flex
items-center
justify-center
">

<p>
Loading dashboard...
</p>

</main>

);

}



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


<div className="flex items-center justify-between">

  <h1
    className="
    text-4xl
    font-bold
    text-black
    "
  >
    Dashboard
  </h1>

</div>

<p className="
mt-3
text-slate-600
">

Your career search overview.

</p>




<div className="
mt-8
grid
gap-6
md:grid-cols-4
">


<StatCard
title="Total Applications"
value={stats?.totalJobs ?? 0}
/>


<StatCard
title="Interviews"
value={stats?.interviews ?? 0}
/>


<StatCard
title="Offers"
value={stats?.offers ?? 0}
/>


<StatCard
title="Interview Rate"
value={`${stats?.interviewRate ?? 0}%`}
/>



</div>





<div className="
mt-10
grid
gap-6
md:grid-cols-3
">


<StatCard
title="Tasks Remaining"
value={stats?.remainingTasks ?? 0}
/>


<StatCard
title="Completed Tasks"
value={stats?.completedTasks ?? 0}
/>


<StatCard
title="Materials"
value={stats?.totalMaterials ?? 0}
/>


</div>





<div className="
mt-10
rounded-xl
border
bg-white
p-6
shadow-sm
">


<h2 className="
text-xl
font-bold
text-black
">

Recent Applications

</h2>



<div className="
mt-5
space-y-4
">


{

(stats?.recentJobs ?? []).map(job => (

<div

key={job.id}

className="
rounded-lg
border
p-4
"

>


<h3 className="
font-bold
text-black
">

{job.company}

</h3>


<p className="
text-slate-600
">

{job.position}

</p>


<p className="
text-sm
text-blue-600
">

{job.status}

</p>


</div>


))

}


</div>


</div>





</div>


</main>

);


}
