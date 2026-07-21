import { NextResponse } from "next/server";
import { getJobs, createJob } from "@/services/jobService";

export async function GET() {
  const jobs = await getJobs();

  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  const body = await request.json();

  const job = await createJob(body);

  return NextResponse.json(job);
}
