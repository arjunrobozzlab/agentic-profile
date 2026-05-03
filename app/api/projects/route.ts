import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const SLUG = process.env.COMPANY_SLUG!;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const { data, error } = await supabase
    .from("companies")
    .select("name, projects")
    .eq("slug", SLUG)
    .eq("active", true)
    .single();

  if (error || !data) return NextResponse.json({ error: "Company not found" }, { status: 404 });

  let projects = data.projects || [];
  if (category) {
    projects = projects.filter((p: { category: string }) =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  return NextResponse.json({ company: data.name, total: projects.length, projects });
}
