import { prisma } from "@/lib/prisma";


export async function getDashboardStats(){

const totalJobs = await prisma.job.count();


const applied = await prisma.job.count({
where:{
status:"Applied",
},
});


const interviews = await prisma.job.count({
where:{
status:"Interview",
},
});


const offers = await prisma.job.count({
where:{
status:"Offer",
},
});


const rejected = await prisma.job.count({
where:{
status:"Rejected",
},
});



const totalTasks = await prisma.task.count();


const completedTasks = await prisma.task.count({
where:{
status:"Completed",
},
});


const remainingTasks = totalTasks - completedTasks;



const totalMaterials = await prisma.material.count();


const resumes = await prisma.material.count({
where:{
type:"Resume",
},
});


const coverLetters = await prisma.material.count({
where:{
type:"Cover Letter",
},
});


const portfolios = await prisma.material.count({
where:{
type:"Portfolio",
},
});



const recentJobs = await prisma.job.findMany({

orderBy:{
createdAt:"desc",
},

take:5,

});



return {

totalJobs,

applied,

interviews,

offers,

rejected,

interviewRate:
totalJobs === 0
?
0
:
Math.round((interviews / totalJobs) * 100),


totalTasks,

completedTasks,

remainingTasks,


totalMaterials,

resumes,

coverLetters,

portfolios,


recentJobs,

};


}