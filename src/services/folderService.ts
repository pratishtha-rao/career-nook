import { prisma } from "@/lib/prisma";

export async function getFolders(userId: string) {
  return prisma.folder.findMany({
    where: {
      userId,
    },
    include: {
      jobs: true,
      contacts: true,
      tasks: true,
      materials: true,
    },
    orderBy: [
      {
        favorite: "desc",
      },
      {
        order: "asc",
      },
      {
        name: "asc",
      },
    ],
  });
}

export async function createFolder(
  userId: string,
  data: {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
  }
) {
  const count = await prisma.folder.count({
    where: {
      userId,
    },
  });

  return prisma.folder.create({
    data: {
      ...data,
      userId,
      order: count,
    },
  });
}

export async function updateFolder(
  id: number,
  userId: string,
  data: {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
    order?: number;
    collapsed?: boolean;
    favorite?: boolean;
  }
) {
  return prisma.folder.update({
    where: {
      id,
      userId,
    },
    data,
  });
}

export async function deleteFolder(
  id: number,
  userId: string
) {
  return prisma.folder.delete({
    where: {
      id,
      userId,
    },
  });
}

/* ----------------------------- */
/* Jobs                          */
/* ----------------------------- */

export async function addJobsToFolder(
  folderId: number,
  jobIds: number[]
) {
  await prisma.folderJob.createMany({
    data: jobIds.map((jobId) => ({
      folderId,
      jobId,
    })),
    skipDuplicates: true,
  });
}

export async function removeJobsFromFolder(
  folderId: number,
  jobIds: number[]
) {
  await prisma.folderJob.deleteMany({
    where: {
      folderId,
      jobId: {
        in: jobIds,
      },
    },
  });
}

/* ----------------------------- */
/* Contacts                      */
/* ----------------------------- */

export async function addContactsToFolder(
  folderId: number,
  contactIds: number[]
) {
  await prisma.folderContact.createMany({
    data: contactIds.map((contactId) => ({
      folderId,
      contactId,
    })),
    skipDuplicates: true,
  });
}

export async function removeContactsFromFolder(
  folderId: number,
  contactIds: number[]
) {
  await prisma.folderContact.deleteMany({
    where: {
      folderId,
      contactId: {
        in: contactIds,
      },
    },
  });
}

/* ----------------------------- */
/* Tasks                         */
/* ----------------------------- */

export async function addTasksToFolder(
  folderId: number,
  taskIds: number[]
) {
  await prisma.folderTask.createMany({
    data: taskIds.map((taskId) => ({
      folderId,
      taskId,
    })),
    skipDuplicates: true,
  });
}

export async function removeTasksFromFolder(
  folderId: number,
  taskIds: number[]
) {
  await prisma.folderTask.deleteMany({
    where: {
      folderId,
      taskId: {
        in: taskIds,
      },
    },
  });
}

/* ----------------------------- */
/* Materials                     */
/* ----------------------------- */

export async function addMaterialsToFolder(
  folderId: number,
  materialIds: number[]
) {
  await prisma.folderMaterial.createMany({
    data: materialIds.map((materialId) => ({
      folderId,
      materialId,
    })),
    skipDuplicates: true,
  });
}

export async function removeMaterialsFromFolder(
  folderId: number,
  materialIds: number[]
) {
  await prisma.folderMaterial.deleteMany({
    where: {
      folderId,
      materialId: {
        in: materialIds,
      },
    },
  });
}