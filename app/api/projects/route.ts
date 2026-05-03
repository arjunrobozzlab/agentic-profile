import { NextResponse } from "next/server";
import { companyConfig } from "@/config/company.config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let projects = companyConfig.projects;

  if (category) {
    projects = projects.filter((p) =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  return NextResponse.json({
    company: companyConfig.name,
    total: projects.length,
    projects,
  });
}
