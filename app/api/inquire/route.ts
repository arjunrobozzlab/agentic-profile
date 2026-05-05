import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const SLUG = process.env.COMPANY_SLUG!;

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, project_description, budget, timeline } = body;

  if (!name || !project_description) {
    return NextResponse.json({ error: "name and project_description are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("companies")
    .select("name, contact")
    .eq("slug", SLUG)
    .eq("active", true)
    .single();

  if (error || !data) return NextResponse.json({ error: "Company not found" }, { status: 404 });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: data.contact?.email,
    subject: `New Agent Inquiry: ${project_description.slice(0, 60)}`,
    html: `
      <h2>New Project Inquiry via Agentic API</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd"><b>Name</b></td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><b>Email</b></td><td style="padding:8px;border:1px solid #ddd">${email || "Not provided"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><b>Project</b></td><td style="padding:8px;border:1px solid #ddd">${project_description}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><b>Budget</b></td><td style="padding:8px;border:1px solid #ddd">${budget || "Not mentioned"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><b>Timeline</b></td><td style="padding:8px;border:1px solid #ddd">${timeline || "Not mentioned"}</td></tr>
      </table>
    `,
  });

  return NextResponse.json({ success: true, message: `Inquiry received. ${data.name} will contact you within 24 hours.` }, { headers: CORS });
}
