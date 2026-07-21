import { NextResponse } from "next/server";
import {
  getContacts,
  createContact,
} from "@/services/contactService";

export async function GET() {
  const contacts = await getContacts();

  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const body = await request.json();

  const contact = await createContact(body);

  return NextResponse.json(contact);
}