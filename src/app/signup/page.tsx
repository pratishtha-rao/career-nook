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

const [message,setMessage]=useState("");

const [loading,setLoading]=useState(false);




async function signup(e:React.FormEvent){

e.preventDefault();

setLoading(true);

setError("");

setMessage("");



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


const response = await fetch("/api/users",{

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



if(!response.ok){

setError(
"Account created but profile creation failed."
);

setLoading(false);

return;

}


}



setMessage(
"Account created. Please sign in with your credentials."
);


setLoading(false);


}




return (

<main className="
min-h-screen
flex
items-center
justify-center
bg-[#f5f9ff]
px-6
">


<div className="
w-full
max-w-md
">


<div className="
mb-8
text-center
">


<h1 className="
text-4xl
font-bold
text-slate-950
">

Create Account

</h1>


<p className="
mt-3
text-slate-600
">

Start organizing your career journey with Career Nook.

</p>


</div>





<form

onSubmit={signup}

className="
bg-white
border
border-blue-100
p-8
shadow-sm
space-y-5
"


>





<div>

<label className="
text-sm
font-medium
text-slate-700
">

Name

</label>


<input

placeholder="Your name"

value={name}

onChange={(e)=>setName(e.target.value)}

className="
mt-2
w-full
border
border-slate-200
p-3
text-slate-900
outline-none
focus:border-blue-500
transition
"

/>

</div>






<div>

<label className="
text-sm
font-medium
text-slate-700
">

Email

</label>


<input

placeholder="you@example.com"

type="email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
mt-2
w-full
border
border-slate-200
p-3
text-slate-900
outline-none
focus:border-blue-500
transition
"

/>

</div>






<div>

<label className="
text-sm
font-medium
text-slate-700
">

Password

</label>


<input

placeholder="Create a password"

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
mt-2
w-full
border
border-slate-200
p-3
text-slate-900
outline-none
focus:border-blue-500
transition
"

/>

</div>






<button

disabled={loading}

className="
w-full
bg-blue-600
px-5
py-3
font-semibold
text-white
hover:bg-blue-700
transition
disabled:opacity-50
"

>

{

loading

?

"Creating Account..."

:

"Create Account"

}

</button>






{
message && (

<p className="
border
border-green-200
bg-green-50
p-3
text-sm
text-green-700
">

{message}

</p>

)

}





{
error && (

<p className="
border
border-red-200
bg-red-50
p-3
text-sm
text-red-600
">

{error}

</p>

)

}




<p className="
text-center
text-sm
text-slate-600
">

Already have an account?

<a

href="/login"

className="
ml-1
font-semibold
text-blue-600
hover:text-blue-700
"

>

Login

</a>

</p>




</form>


</div>


</main>

);

}
