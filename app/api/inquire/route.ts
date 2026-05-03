import { NextResponse } from "next/server";
import { companyConfig } from "@/config/company.config";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, project_description, budget, timeline, contact } = body;

  if (!name || !project_description) {
    return NextResponse.json(
      { error: "name and project_description are required" },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: companyConfig.contact.email,
      subject: `New Agent Inquiry: ${project_description.slice(0, 60)}`,
      html: `
        <h2>New Project Inquiry via Agentic API</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd"><b>Name</b></td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><b>Email</b></td><td style="padding:8px;border:1px solid #ddd">${email || "Not provided"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><b>Contact</b></td><td style="padding:8px;border:1px solid #ddd">${contact || "Not provided"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><b>Project</b></td><td style="padding:8px;border:1px solid #ddd">${project_description}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><b>Budget</b></td><td style="padding:8px;border:1px solid #ddd">${budget || "Not mentioned"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><b>Timeline</b></td><td style="padding:8px;border:1px solid #ddd">${timeline || "Not mentioned"}</td></tr>
        </table>
        <p style="color:#888;margin-top:16px;font-size:12px">Sent via Agentic Profile API — edgeconductor.com</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `Inquiry received. ${companyConfig.name} will contact you within 24 hours.`,
      contact: companyConfig.contact.email,
    });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please contact directly at " + companyConfig.contact.email },
      { status: 500 }
    );
  }
}
