import { defineConfig, loadEnv } from "vite";
import type { IncomingMessage } from "node:http";
import type { ServerResponse } from "node:http";
import type { ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

interface LeadPayload {
  source: "contact_form" | "tracking_audit_offer";
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message?: string;
  websiteUrl?: string;
  monthlyAdSpend?: string;
  adPlatforms?: string;
}

const readRequestBody = async (req: IncomingMessage) => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
};

const isLeadPayload = (payload: unknown): payload is LeadPayload => {
  if (!payload || typeof payload !== "object") return false;
  const data = payload as Record<string, unknown>;
  if (data.source !== "contact_form" && data.source !== "tracking_audit_offer") return false;
  if (typeof data.firstName !== "string" || !data.firstName.trim()) return false;
  if (typeof data.lastName !== "string" || !data.lastName.trim()) return false;
  if (typeof data.email !== "string" || !data.email.trim()) return false;
  return true;
};

const leadsProxyPlugin = (env: Record<string, string>) => ({
  name: "leads-proxy",
  configureServer(server: ViteDevServer) {
    server.middlewares.use("/api/leads", async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: false, message: "Method not allowed" }));
        return;
      }

      const brevoApiKey = env.BREVO_API_KEY || process.env.BREVO_API_KEY;
      if (!brevoApiKey) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: false, message: "BREVO_API_KEY is not configured." }));
        return;
      }

      let payload: LeadPayload;
      try {
        const body = await readRequestBody(req);
        payload = JSON.parse(body);
      } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: false, message: "Invalid JSON payload." }));
        return;
      }

      if (!isLeadPayload(payload)) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: false, message: "Invalid lead payload." }));
        return;
      }

      const contactListId = Number(env.BREVO_CONTACT_LIST_ID || process.env.BREVO_CONTACT_LIST_ID || "2");
      const auditListId = Number(env.BREVO_AUDIT_LIST_ID || process.env.BREVO_AUDIT_LIST_ID || "3");
      const listId = payload.source === "contact_form" ? contactListId : auditListId;

      try {
        const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": brevoApiKey,
          },
          body: JSON.stringify({
            email: payload.email,
            attributes: {
              FIRSTNAME: payload.firstName,
              LASTNAME: payload.lastName,
              COMPANY: payload.company || "",
              MESSAGE: payload.message || "",
              WEBSITE: payload.websiteUrl || "",
              AD_SPEND: payload.monthlyAdSpend || "",
              AD_PLATFORMS: payload.adPlatforms || "",
              SOURCE: payload.source === "contact_form" ? "Contact Form" : "Tracking Audit Landing Page",
            },
            listIds: [listId],
            updateEnabled: true,
          }),
        });

        if (!brevoResponse.ok) {
          const errorText = await brevoResponse.text();
          res.statusCode = 502;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: false, message: `Brevo error: ${errorText.slice(0, 150)}` }));
          return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: true }));
      } catch {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: false, message: "Lead submission failed." }));
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), leadsProxyPlugin(env), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
