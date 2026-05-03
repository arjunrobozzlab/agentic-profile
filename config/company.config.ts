// Company data comes from COMPANY_CONFIG environment variable (JSON string)
// To deploy for any client — just set their data in COMPANY_CONFIG on Vercel
// No code changes needed per client

const raw = process.env.COMPANY_CONFIG;

if (!raw) {
  throw new Error("COMPANY_CONFIG environment variable is not set. See .env.example");
}

export const companyConfig = JSON.parse(raw);
