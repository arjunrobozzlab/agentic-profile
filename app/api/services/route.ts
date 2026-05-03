import { NextResponse } from "next/server";
import { companyConfig } from "@/config/company.config";

export async function GET() {
  return NextResponse.json({
    company: companyConfig.name,
    total: companyConfig.services.length,
    services: companyConfig.services,
  });
}
