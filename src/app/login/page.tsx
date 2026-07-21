"use client";


import {useState} from "react";
import {createClient} from "@/lib/supabase";
import {useRouter} from "next/navigation";
import { getAuthErrorMessage } from "@/lib/authErrors";

export default function LoginPage(){


const router = useRouter();

const supabase = createClient();


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [error,setError] = useState("");

const [loading,setLoading]=useState(false);


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
bg-slate-100
">


<form

onSubmit={login}

className="
bg-white
p-8
rounded-xl
shadow
space-y-4
w-96
"

>

<input

placeholder="Email"

type="email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
border
rounded
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
rounded
p-3
w-full
"

/>



<button

disabled={loading}

className="
bg-blue-600
text-white
rounded
p-3
w-full
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



{
error && (

<p className="
text-red-500
">

{error}

</p>

)

}


</form>


</main>

);

}