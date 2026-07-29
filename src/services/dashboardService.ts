import { prisma } from "@/lib/prisma";

export async function getDashboardStats(userId: string) {
  const totalJobs = await prisma.job.count({
    where: {
      userId,
    },
  });

  const applied = await prisma.job.count({
    where: {
      userId,
      status: {
        in: [
          "Applied",
          "OA",
          "Phone Screen",
          "Recruiter Call",
          "Technical Interview",
          "Behavioral Interview",
          "Interview",
          "Final Interview",
          "Reference Check",
          "Offer",
          "Negotiating",
          "Accepted",
          "Rejected",
          "Ghosted",
          "Withdrawn",
        ],
      },
    },
  });

  const offers = await prisma.job.count({
    where: {
      userId,
      status: {
        in: [
          "Offer",
          "Negotiating",
          "Accepted",
        ],
      },
    },
  });

  const rejected = await prisma.job.count({
    where: {
      userId,
      status: {
        in: [
          "Rejected",
          "Ghosted",
          "Withdrawn",
        ],
      },
    },
  });

  const totalTasks = await prisma.task.count({
    where: {
      userId,
    },
  });

  const completedTasks = await prisma.task.count({
    where: {
      userId,
      status: "Completed",
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
      userId,
      type: "Resume",
    },
  });

  const coverLetters = await prisma.material.count({
    where: {
      userId,
      type: "Cover Letter",
    },
  });

  const portfolios = await prisma.material.count({
    where: {
      userId,
      type: "Portfolio",
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
    offers,
    rejected,

    successRate:
      applied === 0
        ? 0
        : Math.round((offers / applied) * 100),

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