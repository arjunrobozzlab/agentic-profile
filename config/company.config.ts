// Company data comes from COMPANY_CONFIG environment variable (JSON string)
// To deploy for any client — just set their data in COMPANY_CONFIG on Vercel
// No code changes needed per client

const raw = process.env.COMPANY_CONFIG;

export const companyConfig = raw
  ? JSON.parse(raw)
  : { name: "", tagline: "", contact: { email: "", website: "" }, location: "" };
