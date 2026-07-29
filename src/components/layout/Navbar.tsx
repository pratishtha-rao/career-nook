"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import SignOutButton from "@/components/SignOut";


const publicLinks = [
    {
    name: "Home",
    href: "/",
  },
  {
    name: "Demo",
    href: "/demo",
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
    name: "Applications",
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

  /*
  {
    name: "Nook Copilot",
    href: "/copilot",
  },
  */
  {
    name: "Archive",
    href: "/archive",
  },
  {
    name:"Profile",
    href:"/profile",
  },
];


export default function Navbar() {


const [loggedIn,setLoggedIn] = useState(false);

const [supabase] = useState(() => createClient());


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
  <nav className="border-b bg-white overflow-x-hidden">
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

      {/* Top row */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 whitespace-nowrap"
        >
          Career Nook
        </Link>

        {loggedIn && <SignOutButton />}
      </div>

      {/* Navigation */}
      <div
        className="
          mt-4
          flex
          flex-wrap
          justify-center
          gap-x-8
          gap-y-3
          text-sm
          font-medium
        "
      >
        {loggedIn ? (
          privateLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                whitespace-nowrap
                text-slate-600
                transition
                hover:text-blue-600
              "
            >
              {link.name}
            </Link>
          ))
        ) : (
          publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                whitespace-nowrap
                text-slate-600
                transition
                hover:text-blue-600
              "
            >
              {link.name}
            </Link>
          ))
        )}
      </div>

    </div>
  </nav>
);
}