import handler from "../netlify/functions/leads.mjs";
import { toVercelHandler } from "./_adapter.mjs";

export default toVercelHandler(handler);
