import { NextResponse } from "next/server";

import { openai } from "@/lib/openai";

import {
RESUME_OPTIMIZER_SYSTEM_PROMPT
} from "@/lib/copilotPrompts";



export async function POST(request:Request){


try{


const body = await request.json();



const {
resume,
jobDescription,
company,
position

}=body;




if(!resume){

return NextResponse.json(

{
error:"Resume is required"
},

{
status:400
}

);

}



if(!jobDescription){

return NextResponse.json(

{
error:"Job description is required"
},

{
status:400
}

);

}





if(
!process.env.OPENAI_API_KEY ||
process.env.OPENAI_API_KEY==="replace_with_key_later"
){


return NextResponse.json(

{
error:"AI service is not configured yet."
},

{
status:503
}

);


}





const completion =
await openai.chat.completions.create({


model:"gpt-4.1-mini",


messages:[


{

role:"system",

content:RESUME_OPTIMIZER_SYSTEM_PROMPT

},



{


role:"user",

content:

`

Optimize this resume for the following job.


Company:

${company || "Not provided"}



Position:

${position || "Not provided"}



Job Description:

${jobDescription}



Current Resume:

${resume}



`

}



]

});




const optimizedResume =
completion
.choices[0]
.message
.content;



return NextResponse.json({

optimizedResume

});




}catch(error){


console.error(
"Resume optimizer error:",
error
);



return NextResponse.json(

{
error:"Failed to optimize resume"
},

{
status:500
}

);


}


}