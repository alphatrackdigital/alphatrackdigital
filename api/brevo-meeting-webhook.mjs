import handler from "../netlify/functions/brevo-meeting-webhook.mjs";
import { toVercelHandler } from "./_adapter.mjs";

export default toVercelHandler(handler);
