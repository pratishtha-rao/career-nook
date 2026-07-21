import { prisma } from "@/lib/prisma";

export async function getDashboardStats(userId: string) {

  const totalJobs = await prisma.job.count({
    where: {
      userId,
    },
  });

  const applied = await prisma.job.count({
    where: {
      status: "Applied",
      userId,
    },
  });

  const interviews = await prisma.job.count({
    where: {
      status: "Interview",
      userId,
    },
  });

  const offers = await prisma.job.count({
    where: {
      status: "Offer",
      userId,
    },
  });

  const rejected = await prisma.job.count({
    where: {
      status: "Rejected",
      userId,
    },
  });

  const totalTasks = await prisma.task.count({
    where: {
      userId,
    },
  });

  const completedTasks = await prisma.task.count({
    where: {
      status: "Completed",
      userId,
    },
  });

  const remainingTasks = totalTasks - completedTasks;

  const totalMaterials = await prisma.material.count({
    where: {
      userId,
    },
  });

  const resumes = await prisma.material.count({
    where: {
      type: "Resume",
      userId,
    },
  });

  const coverLetters = await prisma.material.count({
    where: {
      type: "Cover Letter",
      userId,
    },
  });

  const portfolios = await prisma.material.count({
    where: {
      type: "Portfolio",
      userId,
    },
  });

  const recentJobs = await prisma.job.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return {
    totalJobs,
    applied,
    interviews,
    offers,
    rejected,

    interviewRate:
      totalJobs === 0
        ? 0
        : Math.round((interviews / totalJobs) * 100),

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