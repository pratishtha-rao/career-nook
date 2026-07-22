"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { getAuthErrorMessage } from "@/lib/authErrors";


export default function LoginPage(){


const router = useRouter();

const supabase = createClient();


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [error,setError] = useState("");

const [loading,setLoading] = useState(false);





async function login(e:React.FormEvent){

e.preventDefault();

setLoading(true);
setError("");



const {
error
} = await supabase.auth.signInWithPassword({

email,

password

});




if(error){

setLoading(false);

setError(
getAuthErrorMessage(error.message)
);

return;

}



setLoading(false);

router.push("/jobs");

router.refresh();

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
rounded-2xl
border
border-blue-100
bg-white
p-8
shadow-lg
shadow-blue-100
">



<div className="
text-center
mb-8
">


<h1 className="
text-4xl
font-bold
text-slate-950
">

Career Nook Login

</h1>


<p className="
mt-3
text-slate-600
">

Welcome back. Continue organizing your career journey.

</p>


</div>






<form

onSubmit={login}

className="
space-y-5
"

>



<div>


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Email

</label>



<input

type="email"

placeholder="you@example.com"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
w-full
rounded-xl
border
border-slate-200
p-3
text-slate-900
outline-none
transition
focus:border-blue-500
focus:ring-2
focus:ring-blue-100
"

/>


</div>







<div>


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Password

</label>



<input

type="password"

placeholder="Enter your password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
w-full
rounded-xl
border
border-slate-200
p-3
text-slate-900
outline-none
transition
focus:border-blue-500
focus:ring-2
focus:ring-blue-100
"

/>


</div>








{
error && (

<div className="
rounded-lg
bg-red-50
border
border-red-200
p-3
text-sm
text-red-600
">

{error}

</div>

)

}








<button

disabled={loading}

className="
w-full
rounded-xl
bg-blue-600
py-3
font-semibold
text-white
transition
hover:bg-blue-700
disabled:cursor-not-allowed
disabled:opacity-60
"

>

{

loading

?

"Logging in..."

:

"Login"

}


</button>





</form>





<div className="
mt-6
text-center
text-sm
text-slate-600
">


<p>

Don&apos;t have an account?

</p>


<a

href="/signup"

className="
mt-1
inline-block
font-semibold
text-blue-600
hover:text-blue-700
"

>

Create one

</a>


</div>





</div>


</div>


</main>

);


}