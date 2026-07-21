import { NextResponse } from "next/server";

import { 
updateMaterial,
deleteMaterial
} from "@/services/materialService";

import { getCurrentUser } from "@/lib/getUser";





export async function PUT(
request:Request,
{
params
}:{
params:Promise<{id:string}>
}
){


const user = await getCurrentUser();


if(!user){

return NextResponse.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}



const {id}=await params;


const body = await request.json();



const material = await updateMaterial(

Number(id),

user.id,

body

);



return NextResponse.json(material);


}







export async function DELETE(
request:Request,
{
params
}:{
params:Promise<{id:string}>
}
){


const user = await getCurrentUser();


if(!user){

return NextResponse.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}



const {id}=await params;



await deleteMaterial(

Number(id),

user.id

);



return NextResponse.json({

success:true

});


}

