// vite.config.ts
import { defineConfig, loadEnv } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///home/project/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "/home/project";
var readRequestBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
};
var isLeadPayload = (payload) => {
  if (!payload || typeof payload !== "object") return false;
  const data = payload;
  if (data.source !== "contact_form" && data.source !== "tracking_audit_offer") return false;
  if (typeof data.firstName !== "string" || !data.firstName.trim()) return false;
  if (typeof data.lastName !== "string" || !data.lastName.trim()) return false;
  if (typeof data.email !== "string" || !data.email.trim()) return false;
  return true;
};
var leadsProxyPlugin = (env) => ({
  name: "leads-proxy",
  configureServer(server) {
    server.middlewares.use("/api/leads", async (req, res) => {
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
      let payload;
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
            "api-key": brevoApiKey
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
              SOURCE: payload.source === "contact_form" ? "Contact Form" : "Tracking Audit Landing Page"
            },
            listIds: [listId],
            updateEnabled: true
          })
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
  }
});
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false
      }
    },
    plugins: [react(), leadsProxyPlugin(env), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHR5cGUgeyBJbmNvbWluZ01lc3NhZ2UgfSBmcm9tIFwibm9kZTpodHRwXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZlclJlc3BvbnNlIH0gZnJvbSBcIm5vZGU6aHR0cFwiO1xuaW1wb3J0IHR5cGUgeyBWaXRlRGV2U2VydmVyIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5cbmludGVyZmFjZSBMZWFkUGF5bG9hZCB7XG4gIHNvdXJjZTogXCJjb250YWN0X2Zvcm1cIiB8IFwidHJhY2tpbmdfYXVkaXRfb2ZmZXJcIjtcbiAgZmlyc3ROYW1lOiBzdHJpbmc7XG4gIGxhc3ROYW1lOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIGNvbXBhbnk/OiBzdHJpbmc7XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIHdlYnNpdGVVcmw/OiBzdHJpbmc7XG4gIG1vbnRobHlBZFNwZW5kPzogc3RyaW5nO1xuICBhZFBsYXRmb3Jtcz86IHN0cmluZztcbn1cblxuY29uc3QgcmVhZFJlcXVlc3RCb2R5ID0gYXN5bmMgKHJlcTogSW5jb21pbmdNZXNzYWdlKSA9PiB7XG4gIGNvbnN0IGNodW5rczogQnVmZmVyW10gPSBbXTtcbiAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiByZXEpIHtcbiAgICBjaHVua3MucHVzaChCdWZmZXIuaXNCdWZmZXIoY2h1bmspID8gY2h1bmsgOiBCdWZmZXIuZnJvbShjaHVuaykpO1xuICB9XG4gIHJldHVybiBCdWZmZXIuY29uY2F0KGNodW5rcykudG9TdHJpbmcoXCJ1dGY4XCIpO1xufTtcblxuY29uc3QgaXNMZWFkUGF5bG9hZCA9IChwYXlsb2FkOiB1bmtub3duKTogcGF5bG9hZCBpcyBMZWFkUGF5bG9hZCA9PiB7XG4gIGlmICghcGF5bG9hZCB8fCB0eXBlb2YgcGF5bG9hZCAhPT0gXCJvYmplY3RcIikgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBkYXRhID0gcGF5bG9hZCBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgaWYgKGRhdGEuc291cmNlICE9PSBcImNvbnRhY3RfZm9ybVwiICYmIGRhdGEuc291cmNlICE9PSBcInRyYWNraW5nX2F1ZGl0X29mZmVyXCIpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBkYXRhLmZpcnN0TmFtZSAhPT0gXCJzdHJpbmdcIiB8fCAhZGF0YS5maXJzdE5hbWUudHJpbSgpKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgZGF0YS5sYXN0TmFtZSAhPT0gXCJzdHJpbmdcIiB8fCAhZGF0YS5sYXN0TmFtZS50cmltKCkpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBkYXRhLmVtYWlsICE9PSBcInN0cmluZ1wiIHx8ICFkYXRhLmVtYWlsLnRyaW0oKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IGxlYWRzUHJveHlQbHVnaW4gPSAoZW52OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSA9PiAoe1xuICBuYW1lOiBcImxlYWRzLXByb3h5XCIsXG4gIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXI6IFZpdGVEZXZTZXJ2ZXIpIHtcbiAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKFwiL2FwaS9sZWFkc1wiLCBhc3luYyAocmVxOiBJbmNvbWluZ01lc3NhZ2UsIHJlczogU2VydmVyUmVzcG9uc2U8SW5jb21pbmdNZXNzYWdlPikgPT4ge1xuICAgICAgaWYgKHJlcS5tZXRob2QgIT09IFwiUE9TVFwiKSB7XG4gICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDA1O1xuICAgICAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IG9rOiBmYWxzZSwgbWVzc2FnZTogXCJNZXRob2Qgbm90IGFsbG93ZWRcIiB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnJldm9BcGlLZXkgPSBlbnYuQlJFVk9fQVBJX0tFWSB8fCBwcm9jZXNzLmVudi5CUkVWT19BUElfS0VZO1xuICAgICAgaWYgKCFicmV2b0FwaUtleSkge1xuICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDUwMDtcbiAgICAgICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBvazogZmFsc2UsIG1lc3NhZ2U6IFwiQlJFVk9fQVBJX0tFWSBpcyBub3QgY29uZmlndXJlZC5cIiB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IHBheWxvYWQ6IExlYWRQYXlsb2FkO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlYWRSZXF1ZXN0Qm9keShyZXEpO1xuICAgICAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShib2R5KTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDQwMDtcbiAgICAgICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBvazogZmFsc2UsIG1lc3NhZ2U6IFwiSW52YWxpZCBKU09OIHBheWxvYWQuXCIgfSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNMZWFkUGF5bG9hZChwYXlsb2FkKSkge1xuICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDQwMDtcbiAgICAgICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBvazogZmFsc2UsIG1lc3NhZ2U6IFwiSW52YWxpZCBsZWFkIHBheWxvYWQuXCIgfSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbnRhY3RMaXN0SWQgPSBOdW1iZXIoZW52LkJSRVZPX0NPTlRBQ1RfTElTVF9JRCB8fCBwcm9jZXNzLmVudi5CUkVWT19DT05UQUNUX0xJU1RfSUQgfHwgXCIyXCIpO1xuICAgICAgY29uc3QgYXVkaXRMaXN0SWQgPSBOdW1iZXIoZW52LkJSRVZPX0FVRElUX0xJU1RfSUQgfHwgcHJvY2Vzcy5lbnYuQlJFVk9fQVVESVRfTElTVF9JRCB8fCBcIjNcIik7XG4gICAgICBjb25zdCBsaXN0SWQgPSBwYXlsb2FkLnNvdXJjZSA9PT0gXCJjb250YWN0X2Zvcm1cIiA/IGNvbnRhY3RMaXN0SWQgOiBhdWRpdExpc3RJZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYnJldm9SZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkuYnJldm8uY29tL3YzL2NvbnRhY3RzXCIsIHtcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgXCJhcGkta2V5XCI6IGJyZXZvQXBpS2V5LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZW1haWw6IHBheWxvYWQuZW1haWwsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgIEZJUlNUTkFNRTogcGF5bG9hZC5maXJzdE5hbWUsXG4gICAgICAgICAgICAgIExBU1ROQU1FOiBwYXlsb2FkLmxhc3ROYW1lLFxuICAgICAgICAgICAgICBDT01QQU5ZOiBwYXlsb2FkLmNvbXBhbnkgfHwgXCJcIixcbiAgICAgICAgICAgICAgTUVTU0FHRTogcGF5bG9hZC5tZXNzYWdlIHx8IFwiXCIsXG4gICAgICAgICAgICAgIFdFQlNJVEU6IHBheWxvYWQud2Vic2l0ZVVybCB8fCBcIlwiLFxuICAgICAgICAgICAgICBBRF9TUEVORDogcGF5bG9hZC5tb250aGx5QWRTcGVuZCB8fCBcIlwiLFxuICAgICAgICAgICAgICBBRF9QTEFURk9STVM6IHBheWxvYWQuYWRQbGF0Zm9ybXMgfHwgXCJcIixcbiAgICAgICAgICAgICAgU09VUkNFOiBwYXlsb2FkLnNvdXJjZSA9PT0gXCJjb250YWN0X2Zvcm1cIiA/IFwiQ29udGFjdCBGb3JtXCIgOiBcIlRyYWNraW5nIEF1ZGl0IExhbmRpbmcgUGFnZVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpc3RJZHM6IFtsaXN0SWRdLFxuICAgICAgICAgICAgdXBkYXRlRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFicmV2b1Jlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgY29uc3QgZXJyb3JUZXh0ID0gYXdhaXQgYnJldm9SZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA1MDI7XG4gICAgICAgICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IG9rOiBmYWxzZSwgbWVzc2FnZTogYEJyZXZvIGVycm9yOiAke2Vycm9yVGV4dC5zbGljZSgwLCAxNTApfWAgfSkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcy5zdGF0dXNDb2RlID0gMjAwO1xuICAgICAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IG9rOiB0cnVlIH0pKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDUwMDtcbiAgICAgICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBvazogZmFsc2UsIG1lc3NhZ2U6IFwiTGVhZCBzdWJtaXNzaW9uIGZhaWxlZC5cIiB9KSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG59KTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKTtcblxuICByZXR1cm4ge1xuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogXCI6OlwiLFxuICAgICAgcG9ydDogODA4MCxcbiAgICAgIGhtcjoge1xuICAgICAgICBvdmVybGF5OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbcmVhY3QoKSwgbGVhZHNQcm94eVBsdWdpbihlbnYpLCBtb2RlID09PSBcImRldmVsb3BtZW50XCIgJiYgY29tcG9uZW50VGFnZ2VyKCldLmZpbHRlcihCb29sZWFuKSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLGNBQWMsZUFBZTtBQUkvUCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBTmhDLElBQU0sbUNBQW1DO0FBb0J6QyxJQUFNLGtCQUFrQixPQUFPLFFBQXlCO0FBQ3RELFFBQU0sU0FBbUIsQ0FBQztBQUMxQixtQkFBaUIsU0FBUyxLQUFLO0FBQzdCLFdBQU8sS0FBSyxPQUFPLFNBQVMsS0FBSyxJQUFJLFFBQVEsT0FBTyxLQUFLLEtBQUssQ0FBQztBQUFBLEVBQ2pFO0FBQ0EsU0FBTyxPQUFPLE9BQU8sTUFBTSxFQUFFLFNBQVMsTUFBTTtBQUM5QztBQUVBLElBQU0sZ0JBQWdCLENBQUMsWUFBNkM7QUFDbEUsTUFBSSxDQUFDLFdBQVcsT0FBTyxZQUFZLFNBQVUsUUFBTztBQUNwRCxRQUFNLE9BQU87QUFDYixNQUFJLEtBQUssV0FBVyxrQkFBa0IsS0FBSyxXQUFXLHVCQUF3QixRQUFPO0FBQ3JGLE1BQUksT0FBTyxLQUFLLGNBQWMsWUFBWSxDQUFDLEtBQUssVUFBVSxLQUFLLEVBQUcsUUFBTztBQUN6RSxNQUFJLE9BQU8sS0FBSyxhQUFhLFlBQVksQ0FBQyxLQUFLLFNBQVMsS0FBSyxFQUFHLFFBQU87QUFDdkUsTUFBSSxPQUFPLEtBQUssVUFBVSxZQUFZLENBQUMsS0FBSyxNQUFNLEtBQUssRUFBRyxRQUFPO0FBQ2pFLFNBQU87QUFDVDtBQUVBLElBQU0sbUJBQW1CLENBQUMsU0FBaUM7QUFBQSxFQUN6RCxNQUFNO0FBQUEsRUFDTixnQkFBZ0IsUUFBdUI7QUFDckMsV0FBTyxZQUFZLElBQUksY0FBYyxPQUFPLEtBQXNCLFFBQXlDO0FBQ3pHLFVBQUksSUFBSSxXQUFXLFFB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
