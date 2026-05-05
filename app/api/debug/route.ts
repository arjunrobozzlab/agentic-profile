import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const slug = process.env.COMPANY_SLUG;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const { data, error } = await supabase
    .from("companies")
    .select("slug, active")
    .limit(5);

  return NextResponse.json({
    env_slug: slug,
    supabase_url: supabaseUrl?.slice(0, 40) + "...",
    all_rows: data,
    db_error: error?.message || null,
  });
}
