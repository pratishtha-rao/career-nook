import {
  updateJob,
  deleteJob,
} from "@/services/jobService";

import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updatedJob = await updateJob(Number(id), body);

  return NextResponse.json(updatedJob);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await deleteJob(Number(id));

  return NextResponse.json({
    success: true,
    },

    )}

    