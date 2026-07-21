import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function middleware(request: NextRequest) {


const response = NextResponse.next();


const supabase = createServerClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

{

cookies: {

getAll() {

return request.cookies.getAll();

},

setAll(cookiesToSet) {

cookiesToSet.forEach(({name,value}) => {

request.cookies.set(name,value);

response.cookies.set(name,value);

});

}

}

}

);



const {
data:{
session
}

} = await supabase.auth.getSession();



const protectedRoutes = [

"/dashboard",
"/jobs",
"/contacts",
"/tasks",
"/materials"

];


const isProtectedRoute =
protectedRoutes.some((route)=>

request.nextUrl.pathname.startsWith(route)

);



if(isProtectedRoute && !session){

return NextResponse.redirect(

new URL("/login", request.url)

);

}



return response;

}



export const config = {

matcher:[

"/dashboard/:path*",
"/jobs/:path*",
"/contacts/:path*",
"/tasks/:path*",
"/materials/:path*"

]

};