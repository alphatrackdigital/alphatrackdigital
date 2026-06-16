const readRequestBody = async (req) => {
  if (req.method === "GET" || req.method === "HEAD") return undefined;

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return chunks.length > 0 ? Buffer.concat(chunks) : undefined;
};

const toHeaders = (headers) => {
  const result = new Headers();

  for (const [key, value] of Object.entries(headers ?? {})) {
    if (Array.isArray(value)) {
      for (const item of value) result.append(key, item);
    } else if (typeof value !== "undefined") {
      result.set(key, String(value));
    }
  }

  return result;
};

const toRequestUrl = (req) => {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "localhost";
  return new URL(req.url || "/", `${protocol}://${host}`).toString();
};

export const toVercelHandler = (fetchHandler) => async (req, res) => {
  try {
    const request = new Request(toRequestUrl(req), {
      method: req.method,
      headers: toHeaders(req.headers),
      body: await readRequestBody(req),
    });

    const response = await fetchHandler(request);
    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error("Vercel API adapter failed", {
      message: error instanceof Error ? error.message : String(error),
    });

    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.setHeader("cache-control", "no-store");
    res.end(JSON.stringify({ ok: false, message: "Unable to process request." }));
  }
};
