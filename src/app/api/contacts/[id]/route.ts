import { NextResponse } from "next/server";

import {
  updateContact,
  deleteContact,
} from "@/services/contactService";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const updated = await updateContact(Number(id), body);

  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await deleteContact(Number(id));

  return NextResponse.json({
    success: true,
  });
}