import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const SLUG = process.env.COMPANY_SLUG!;

export async function GET() {
  const { data, error } = await supabase
    .from("companies")
    .select("name, tagline, description, location, serving, experience_years, founded, contact, how_to_hire, services, projects")
    .eq("slug", SLUG)
    .eq("active", true)
    .single();

  if (error || !data) {
    return new Response("Company not found", { status: 404, headers: { "Content-Type": "text/plain" } });
  }

  const services = (data.services || [])
    .map((s: { name: string; description: string; skills?: string[] }) =>
      `- ${s.name}: ${s.description}${s.skills?.length ? ` [Skills: ${s.skills.join(", ")}]` : ""}`
    )
    .join("\n");

  const projects = (data.projects || [])
    .map((p: { name: string; description: string; category?: string; tech?: string[] }) =>
      `- ${p.name} (${p.category || "Project"}): ${p.description}${p.tech?.length ? ` [Tech: ${p.tech.join(", ")}]` : ""}`
    )
    .join("\n");

  const text = `# ${data.name}
${data.tagline || ""}

## About
${data.description || ""}

Location: ${data.location || ""}
Serving: ${data.serving || ""}
Founded: ${data.founded || ""}
Experience: ${data.experience_years || ""} years

## Services
${services}

## Projects
${projects}

## Contact
Email: ${data.contact?.email || ""}
Website: ${data.contact?.website || ""}

## How to Hire
${data.how_to_hire || ""}

## API Endpoints (for agents)
- GET /api/info — full company profile
- GET /api/services — services with skills and use cases
- GET /api/projects — portfolio (filter: ?category=iot)
- POST /api/inquire — submit a project inquiry (returns confirmation)
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
