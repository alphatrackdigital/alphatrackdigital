import handler from "../netlify/functions/brevo-subscribe.mjs";
import { toVercelHandler } from "./_adapter.mjs";

export default toVercelHandler(handler);
