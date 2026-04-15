import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import { AppRouter, AppShell } from "./App";

export const render = (url = "/") => {
  const helmetContext: {
    helmet?: {
      title: { toString(): string };
      meta: { toString(): string };
      link: { toString(): string };
      script: { toString(): string };
    };
  } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <AppShell>
        <StaticRouter location={url}>
          <AppRouter />
        </StaticRouter>
      </AppShell>
    </HelmetProvider>,
  );

  const { helmet } = helmetContext;

  return {
    html,
    head: [
      helmet?.title.toString() ?? "",
      helmet?.meta.toString() ?? "",
      helmet?.link.toString() ?? "",
      helmet?.script.toString() ?? "",
    ].join(""),
  };
};
