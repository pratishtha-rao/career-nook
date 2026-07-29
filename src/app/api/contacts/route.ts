import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getUser";


// GET contacts
export async function GET(){

const user = await getCurrentUser();


if(!user){

return Response.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}


const contacts = await prisma.contact.findMany({
  where: {
    userId: user.id,
      archived: false,
  },

  orderBy: {
    order: "asc",
  },

  include: {
    folderContacts: {
      include: {
        folder: true,
      },
    },
  },
});


return Response.json(contacts);

}





// CREATE contact
export async function POST(request:Request){

const user = await getCurrentUser();


if(!user){

return Response.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}


const body = await request.json();


const { folderIds = [], ...contactData } = body;


const lastContact = await prisma.contact.findFirst({
  where: {
    userId: user.id,
  },
  orderBy: {
    order: "desc",
  },
});

const contact = await prisma.contact.create({
  data: {
    ...contactData,
    userId: user.id,
    order: (lastContact?.order ?? -1) + 1,

    folderContacts: {
      create: folderIds.map((folderId: number) => ({
        folder: {
          connect: {
            id: folderId,
          },
        },
      })),
    },
  },

  include: {
    folderContacts: {
      include: {
        folder: true,
      },
    },
  },
});

return Response.json(contact);

}