import { createUser } from "@/lib/createUser";


export async function POST(request:Request){


const body=await request.json();


const user=await createUser(body);


return Response.json(user);


}