import { prisma } from "@/lib/prisma";
import type { OfficeType } from "@prisma/client";

type JobData = {
  company: string;
  position: string;
  status: string;
  dateApplied: Date;

  salary?: string;
  salaryNotes?: string;

  location?: string;
  officeType?: OfficeType;

  url?: string;
  description?: string;
  notes?: string;

  referredBy?: string;

  folderIds?: number[];

  archived?: boolean;
};

export async function getJobs(userId: string) {
  return prisma.job.findMany({
    where: {
      userId,
    },

    include: {
      folders: {
        include: {
          folder: true,
        },
      },

      contacts: {
        include: {
          contact: true,
        },
      },

      tasks: {
        include: {
          task: true,
        },
      },

      materials: {
        include: {
          material: true,
        },
      },
    },
  });
}

export async function createJob(
  userId: string,
  data: JobData
) {
  const { folderIds = [], ...jobData } = data;

  return prisma.job.create({
    data: {
      ...jobData,

      user: {
        connect: {
          id: userId,
        },
      },

      folders: {
        create: folderIds.map((folderId) => ({
          folder: {
            connect: {
              id: folderId,
            },
          },
        })),
      },
    },

    include: {
      folders: {
        include: {
          folder: true,
        },
      },

      contacts: {
        include: {
          contact: true,
        },
      },

      tasks: {
        include: {
          task: true,
        },
      },

      materials: {
        include: {
          material: true,
        },
      },
    },
  });
}

export async function updateJob(
  id: number,
  userId: string,
  data: JobData
) {
  const { folderIds = [], ...jobData } = data;

  return prisma.job.update({
    where: {
      id,
      userId,
    },

    data: {
      ...jobData,

      folders: {
        deleteMany: {},

        create: folderIds.map((folderId) => ({
          folder: {
            connect: {
              id: folderId,
            },
          },
        })),
      },
    },

    include: {
      folders: {
        include: {
          folder: true,
        },
      },

      contacts: {
        include: {
          contact: true,
        },
      },

      tasks: {
        include: {
          task: true,
        },
      },

      materials: {
        include: {
          material: true,
        },
      },
    },
  });
}

export async function archiveJob(
  id: number,
  userId: string
) {
  return prisma.job.update({
    where: {
      id,
      userId,
    },

    data: {
      archived: true,
    },
  });
}

export async function deleteJob(
  id: number,
  userId: string
) {
  return prisma.job.delete({
    where: {
      id,
      userId,
    },
  });
}