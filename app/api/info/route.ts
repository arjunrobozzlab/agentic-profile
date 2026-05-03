import { NextResponse } from "next/server";
import { companyConfig } from "@/config/company.config";

export async function GET() {
  return NextResponse.json({
    name: companyConfig.name,
    tagline: companyConfig.tagline,
    description: companyConfig.description,
    location: companyConfig.location,
    serving: companyConfig.serving,
    experience_years: companyConfig.experience_years,
    founded: companyConfig.founded,
    contact: companyConfig.contact,
    how_to_hire: companyConfig.how_to_hire,
  });
}
