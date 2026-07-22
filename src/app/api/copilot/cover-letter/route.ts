import { NextResponse } from "next/server";

import { openai } from "@/lib/openai";

import {
  COVER_LETTER_SYSTEM_PROMPT
} from "@/lib/copilotPrompts";



export async function POST(request: Request){


try{


const body = await request.json();



const {
company,
position,
jobDescription,
draft

}=body;




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
process.env.OPENAI_API_KEY === "replace_with_key_later"
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

content:COVER_LETTER_SYSTEM_PROMPT

},



{


role:"user",

content:

`

Create a personalized cover letter using the information below.


Company:

${company || "Not provided"}



Position:

${position || "Not provided"}



Job Description:

${jobDescription}



Existing Draft:

${draft || "No existing draft provided"}

`

}



]

});





const letter =
completion
.choices[0]
.message
.content;




return NextResponse.json({

letter

});





}catch(error){


console.error(
"Cover Letter Generation Error:",
error
);



return NextResponse.json(

{
error:"Failed to generate cover letter"
},

{
status:500
}

);


}


}