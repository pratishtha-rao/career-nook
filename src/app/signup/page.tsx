"use client";


import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function SignupPage(){


const router = useRouter();

const supabase = createClient();


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [name,setName]=useState("");

const [error,setError]=useState("");

const [loading,setLoading]=useState(false);



async function signup(e:React.FormEvent){

e.preventDefault();

setLoading(true);

setError("");



const {
data,
error

}=await supabase.auth.signUp({

email,

password,

});



if(error){

setError(error.message);

setLoading(false);

return;

}



if(data.user){


await fetch("/api/users",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id:data.user.id,

email:data.user.email,

name

})

});


}



router.push("/dashboard");


}




return (

<main className="
min-h-screen
flex
items-center
justify-center
bg-slate-100
">


<form

onSubmit={signup}

className="
bg-white
p-8
rounded-xl
space-y-4
w-96
"


>


<h1 className="
text-2xl
font-bold
">

Create Account

</h1>



<input

placeholder="Name"

value={name}

onChange={(e)=>setName(e.target.value)}

className="
border
p-3
w-full
"

/>



<input

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
border
p-3
w-full
"

/>



<input

placeholder="Password"

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
border
p-3
w-full
"

/>



<button

disabled={loading}

className="
bg-blue-600
text-white
rounded-lg
p-3
w-full
"

>

{loading ? "Creating..." : "Sign Up"}

</button>



{
error && (

<p className="text-red-500">

{error}

</p>

)

}


</form>


</main>

);

}