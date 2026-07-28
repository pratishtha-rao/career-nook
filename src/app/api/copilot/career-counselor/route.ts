import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      question,
      resume,
      targetJob,
      experience,
    } = body;

    if (!question || question.trim() === "") {
      return NextResponse.json(
        {
          error: "Question is required.",
        },
        {
          status: 400,
        }
      );
    }

    const prompt = `
You are Career Nook's AI Career Counselor.

Your job is to act like a professional career coach.

The user may ask ANY career-related question including:

• Career planning
• Resume advice
• Internship advice
• Salary negotiation
• Networking
• Interview preparation
• Choosing majors
• Graduate school
• Certifications
• Career switching
• Promotion planning
• Job searching
• LinkedIn optimization
• Building projects
• Learning roadmaps
• Technical interview preparation
• Behavioral interview preparation

If the user provides a resume, analyze it carefully.

If they provide a target job, compare their resume against the job.

If they ask how to become something, provide a complete roadmap.

Always be encouraging while remaining honest.

Format responses using markdown.

Whenever appropriate, use the following sections:

# Summary

# Strengths

# Weaknesses

# Recommended Roadmap

# Skills to Learn

# Projects to Build

# Resume Improvements

# Interview Preparation

# Networking Advice

# Next Steps

User Question:
${question}

Target Job:
${targetJob || "Not provided"}

Experience:
${experience || "Not provided"}

Resume:
${resume || "Not provided"}
`;

    const response = await client.responses.create({
      model: "gpt-5",
      input: prompt,
    });

    return NextResponse.json({
      answer: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate career advice.",
      },
      {
        status: 500,
      }
    );
  }
}