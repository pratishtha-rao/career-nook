"use client";


import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase";

import { useRouter } from "next/navigation";



export default function ProfilePage(){


const router = useRouter();

const supabase = createClient();



const [name,setName]=useState("");

const [email,setEmail]=useState("");


const [createdAt,setCreatedAt]=useState("");



const [newPassword,setNewPassword]=useState("");

const [confirmPassword,setConfirmPassword]=useState("");



const [profileMessage,setProfileMessage]=useState("");

const [profileError,setProfileError]=useState("");



const [emailMessage,setEmailMessage]=useState("");

const [emailError,setEmailError]=useState("");



const [passwordMessage,setPasswordMessage]=useState("");

const [passwordError,setPasswordError]=useState("");



const [loading,setLoading]=useState(true);





useEffect(()=>{


async function loadProfile(){


const {
data:{
user
}

}=await supabase.auth.getUser();



if(!user){

router.push("/login");

return;

}



setEmail(user.email ?? "");

setCreatedAt(
new Date(user.created_at)
.toLocaleDateString()
);



const response = await fetch("/api/profile");

const data = await response.json();



if(response.ok){

setName(data.name ?? "");

}

else{

setProfileError(
"Could not load profile"
);

}



setLoading(false);


}



loadProfile();


},[router]);









async function updateProfile(){


setProfileMessage("");

setProfileError("");



const response = await fetch("/api/profile",{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name

})

});



if(response.ok){

setProfileMessage(
"Profile updated successfully"
);

}

else{

setProfileError(
"Could not update profile"
);

}



}


async function updatePassword(){


setPasswordMessage("");

setPasswordError("");



if(newPassword.length < 6){

setPasswordError(
"Password must be at least 6 characters"
);

return;

}



if(newPassword !== confirmPassword){

setPasswordError(
"Passwords do not match"
);

return;

}





const {
error

}=await supabase.auth.updateUser({

password:newPassword

});



if(error){

setPasswordError(error.message);

return;

}



setNewPassword("");

setConfirmPassword("");



setPasswordMessage(
"Password changed successfully"
);


}










async function signOut(){


await supabase.auth.signOut();


router.push("/login");


}








if(loading){

return (

<div className="
min-h-screen
flex
items-center
justify-center
">

Loading profile...

</div>

);

}






return (

<main className="
min-h-screen
bg-slate-100
">


<div className="
mx-auto
max-w-3xl
px-8
py-12
">


<h1 className="
text-4xl
font-bold
text-black
">

Profile Settings

</h1>


<p className="
mt-2
text-slate-600
">

Manage your account information and security.

</p>









<section className="
mt-8
rounded-xl
bg-white
p-8
shadow-sm
">


<h2 className="
text-xl
font-bold
">

Personal Information

</h2>



<div className="
mt-6
space-y-5
">



<label className="
block
text-sm
font-medium
">

Name

</label>


<input

value={name}

onChange={(e)=>setName(e.target.value)}

className="
border
rounded-lg
p-3
w-full
"

/>





<label className="
block
text-sm
font-medium
">

Email

</label>


<input

value={email}

disabled

className="
border
rounded-lg
p-3
w-full
bg-slate-100
"

/>

{
emailMessage && (

<p className="
text-green-600
">

{emailMessage}

</p>

)

}



{
emailError && (

<p className="
text-red-600
">

{emailError}

</p>

)

}

<button

type="button"

onClick={updateProfile}

className="
bg-blue-600
text-white
rounded-lg
px-5
py-3
"

>

Save Profile

</button>



{
profileMessage && (

<p className="
text-green-600
">

{profileMessage}

</p>

)

}



{
profileError && (

<p className="
text-red-600
">

{profileError}

</p>

)

}



</div>


</section>











<section className="
mt-8
rounded-xl
bg-white
p-8
shadow-sm
">


<h2 className="
text-xl
font-bold
">

Security

</h2>



<div className="
mt-6
space-y-5
">


<input

type="password"

placeholder="New Password"

value={newPassword}

onChange={(e)=>setNewPassword(e.target.value)}

className="
border
rounded-lg
p-3
w-full
"

/>



<input

type="password"

placeholder="Confirm Password"

value={confirmPassword}

onChange={(e)=>setConfirmPassword(e.target.value)}

className="
border
rounded-lg
p-3
w-full
"

/>



<button

type="button"

onClick={updatePassword}

className="
border
border-blue-600
text-blue-600
rounded-lg
px-5
py-3
"

>

Update Password

</button>




{
passwordMessage && (

<p className="
text-green-600
">

{passwordMessage}

</p>

)

}



{
passwordError && (

<p className="
text-red-600
">

{passwordError}

</p>

)

}



</div>


</section>









<section className="
mt-8
rounded-xl
bg-white
p-8
shadow-sm
">


<h2 className="
text-xl
font-bold
">

Account Actions

</h2>



<button

type="button"

onClick={signOut}

className="
mt-5
text-red-600
border
border-red-600
rounded-lg
px-5
py-3
"

>

Sign Out

</button>


</section>







</div>


</main>

);


}