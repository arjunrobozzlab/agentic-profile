import { companyConfig } from "@/config/company.config";

export const dynamic = "force-dynamic";

const endpoints = [
  {
    method: "GET",
    path: "/api/info",
    description: "Company overview — name, location, contact, how to hire",
    example: "/api/info",
  },
  {
    method: "GET",
    path: "/api/services",
    description: "All services with skills, use cases, and hardware",
    example: "/api/services",
  },
  {
    method: "GET",
    path: "/api/projects",
    description: "Portfolio projects. Filter by ?category=iot",
    example: "/api/projects?category=iot",
  },
  {
    method: "POST",
    path: "/api/inquire",
    description: "Submit a project inquiry — owner gets email instantly",
    example: null,
  },
  {
    method: "GET",
    path: "/llms.txt",
    description: "Plain text profile for LLMs and AI crawlers",
    example: "/llms.txt",
  },
];

const methodColor: Record<string, string> = {
  GET: "bg-green-500/20 text-green-400 border-green-500/30",
  POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-16 max-w-3xl mx-auto">

      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">
          Agentic Profile API
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">{companyConfig.name}</h1>
        <p className="text-white/50 text-sm">{companyConfig.tagline}</p>
        <p className="text-white/30 text-xs mt-4">
          This API allows AI agents to query company info and submit inquiries
          without forms or UI. Built for the agentic web.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">
          Available Endpoints
        </h2>
        <div className="flex flex-col gap-3">
          {endpoints.map((e) => (
            <div
              key={e.path}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${methodColor[e.method]}`}>
                  {e.method}
                </span>
                <code className="text-sm text-white font-mono">{e.path}</code>
              </div>
              <p className="text-white/40 text-sm">{e.description}</p>
              {e.example && (
                <a
                  href={e.example}
                  className="text-xs text-blue-400 mt-2 inline-block hover:underline"
                >
                  Try: {e.example}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">
          POST /api/inquire — Body Format
        </h2>
        <pre className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white/70 overflow-x-auto">
{`{
  "name": "John Smith",
  "email": "john@example.com",
  "project_description": "Need edge AI for factory defect detection",
  "budget": "$3000",
  "timeline": "6 weeks"
}`}
        </pre>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">
          Contact
        </h2>
        <div className="text-white/50 text-sm flex flex-col gap-1">
          <span>{companyConfig.contact.email}</span>
          <span>{companyConfig.contact.website}</span>
          <span>{companyConfig.location}</span>
        </div>
      </section>

    </main>
  );
}
