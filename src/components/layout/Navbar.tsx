"use client";
// src/components/layout/Navbar.tsx

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import SignOutButton from "@/components/SignOut";


const publicLinks = [
  {
    name:"Try Demo",
    href:"/demo"
  },
  {
    name: "Sign Up",
    href: "/signup",
  },
  {
    name: "Login",
    href: "/login",
  },
];


const privateLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Jobs",
    href: "/jobs",
  },
  {
    name: "Contacts",
    href: "/contacts",
  },
  {
    name: "Tasks",
    href: "/tasks",
  },
  {
    name: "Materials",
    href: "/materials",
  },
  {
    name: "Nook Copilot",
    href: "/copilot",
  },
  {
    name:"Profile",
    href:"/profile",
  },
];


export default function Navbar() {


const [loggedIn,setLoggedIn] = useState(false);

const supabase = createClient();



useEffect(()=>{


async function checkUser(){

const {
data:{
session
}
}=await supabase.auth.getSession();


setLoggedIn(!!session);


}


checkUser();



const {
data:{
subscription
}
}=supabase.auth.onAuthStateChange(
(_event,session)=>{


setLoggedIn(!!session);


});


return ()=>{

subscription.unsubscribe();

};


},[]);




return (

<nav className="border-b bg-white">


<div className="
mx-auto 
flex 
max-w-7xl 
items-center 
justify-between 
px-8 
py-5
">


<Link
href="/"
className="text-2xl font-bold text-blue-600"
>
Career Nook
</Link>



<div className="flex items-center gap-8 text-sm font-medium">


{
loggedIn ? (

<>

{
privateLinks.map(link=>(

<Link
key={link.href}
href={link.href}
className="
text-slate-600 
transition 
hover:text-blue-600
"
>

{link.name}

</Link>

))

}


<SignOutButton />

</>


) : (

<>

{
publicLinks.map(link=>(

<Link
key={link.href}
href={link.href}
className="
text-slate-600 
transition 
hover:text-blue-600
"
>

{link.name}

</Link>

))

}

</>

)

}


</div>


</div>


</nav>

);


}