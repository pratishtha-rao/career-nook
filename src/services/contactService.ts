import { prisma } from "@/lib/prisma";

export async function getContacts() {
  return prisma.contact.findMany({
    orderBy: {
      id: "desc",
    },
  });
}

export async function createContact(data: {
  name: string;
  company: string;
  role: string;
  type: string;
  email?: string;
  notes?: string;
}) {
  return prisma.contact.create({
    data,
  });
}

export async function updateContact(
  id: number,
  data: {
    name: string;
    company: string;
    role: string;
    type: string;
    email?: string;
    notes?: string;
  }
) {
  return prisma.contact.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteContact(id: number) {
  return prisma.contact.delete({
    where: {
      id,
    },
  });
}
