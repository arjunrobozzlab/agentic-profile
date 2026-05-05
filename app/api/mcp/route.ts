import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";
import { z } from "zod";

export const dynamic = "force-dynamic";

const SLUG = process.env.COMPANY_SLUG!;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, mcp-session-id",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

function buildServer() {
  const server = new McpServer({ name: "agentic-profile", version: "1.0.0" });

  server.tool(
    "get_info",
    "Get company overview: name, tagline, description, location, experience, and how to hire",
    {},
    async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("name, tagline, description, location, serving, experience_years, founded, contact, how_to_hire")
        .eq("slug", SLUG)
        .eq("active", true)
        .single();

      if (error || !data) return { content: [{ type: "text" as const, text: "Company not found" }] };
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.tool(
    "get_services",
    "Get all services the company offers, including skills, hardware, and use cases",
    {},
    async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("name, services")
        .eq("slug", SLUG)
        .eq("active", true)
        .single();

      if (error || !data) return { content: [{ type: "text" as const, text: "Company not found" }] };
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.tool(
    "get_projects",
    "Get portfolio projects. Filter by category keyword like 'iot', 'robotics', 'ai', 'lidar'",
    { category: z.string().optional().describe("Category keyword to filter projects") },
    async ({ category }) => {
      const { data, error } = await supabase
        .from("companies")
        .select("name, projects")
        .eq("slug", SLUG)
        .eq("active", true)
        .single();

      if (error || !data) return { content: [{ type: "text" as const, text: "Company not found" }] };

      let projects = data.projects || [];
      if (category) {
        projects = projects.filter((p: { category: string }) =>
          p.category.toLowerCase().includes(category.toLowerCase())
        );
      }

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({ company: data.name, total: projects.length, projects }, null, 2),
        }],
      };
    }
  );

  server.tool(
    "submit_inquiry",
    "Submit a project inquiry. The company owner gets an email instantly with your details.",
    {
      name: z.string().describe("Your name or company name"),
      email: z.string().optional().describe("Your contact email address"),
      project_description: z.string().describe("Describe what you need built or solved"),
      budget: z.string().optional().describe("Your budget range, e.g. '$5000'"),
      timeline: z.string().optional().describe("Expected timeline, e.g. '6 weeks'"),
    },
    async ({ name, email, project_description, budget, timeline }) => {
      const { data, error } = await supabase
        .from("companies")
        .select("name, contact")
        .eq("slug", SLUG)
        .eq("active", true)
        .single();

      if (error || !data) return { content: [{ type: "text" as const, text: "Company not found" }] };

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

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({ success: true, message: `Inquiry received. ${data.name} will contact you within 24 hours.` }),
        }],
      };
    }
  );

  return server;
}

async function handle(request: Request): Promise<Response> {
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  const server = buildServer();
  await server.connect(transport);
  const response = await transport.handleRequest(request);
  // Merge CORS headers
  const headers = new Headers(response.headers);
  Object.entries(CORS).forEach(([k, v]) => headers.set(k, v));
  return new Response(response.body, { status: response.status, headers });
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}
