import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { applicationMatchSystemPrompt } from "@/lib/prompts/applicationMatchPrompt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      jobDescription,
      resume,
    } = body;

    if (!jobDescription || !resume) {
      return NextResponse.json(
        {
          error: "Job description and resume are required.",
        },
        {
          status: 400,
        }
      );
    }

    const client = getOpenAI();

    if (!client) {
      return NextResponse.json(
        {
          error: "AI service is not configured yet.",
        },
        {
          status: 503,
        }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",
          content: applicationMatchSystemPrompt,
        },
        {
          role: "user",
          content: `
JOB DESCRIPTION:

${jobDescription}

CANDIDATE RESUME:

${resume}
`,
        },
      ],
    });

    const analysis = JSON.parse(
      completion.choices[0].message.content || "{}"
    );

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Application Match Error:", error);

    return NextResponse.json(
      {
        error: "Failed to analyze application match.",
      },
      {
        status: 500,
      }
    );
  }
}