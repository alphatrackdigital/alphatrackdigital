import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const distDir = path.resolve(process.cwd(), "dist");
const templatePath = path.join(distDir, "index.html");
const serverEntryPath = path.join(distDir, "server", "entry-server.js");

const replaceSection = (source, startMarker, endMarker, replacement) => {
  const startIndex = source.indexOf(startMarker);
  const endIndex = source.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`Could not find markers ${startMarker} ... ${endMarker}`);
  }

  const before = source.slice(0, startIndex + startMarker.length);
  const after = source.slice(endIndex);

  return `${before}\n${replacement}\n    ${after}`;
};

const prerender = async () => {
  const template = await readFile(templatePath, "utf8");
  const serverModule = await import(pathToFileURL(serverEntryPath).href);

  if (typeof serverModule.render !== "function") {
    throw new Error("The server entry must export a render(url) function.");
  }

  const { html, head } = await serverModule.render("/");

  if (typeof html !== "string" || !html.trim()) {
    throw new Error("Prerendered homepage HTML was empty.");
  }

  const withHead = replaceSection(template, "<!--app-seo-start-->", "<!--app-seo-end-->", head.trim());
  const withHtml = replaceSection(withHead, "<!--app-html-start-->", "<!--app-html-end-->", html.trim());
  const output = withHtml.replace('id="root" data-prerendered="false"', 'id="root" data-prerendered="true"');

  await writeFile(templatePath, output, "utf8");
  await rm(path.join(distDir, "server"), { recursive: true, force: true });
};

await prerender();
