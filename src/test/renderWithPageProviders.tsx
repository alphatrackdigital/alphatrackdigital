import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

export const renderWithPageProviders = (
  ui: ReactElement,
  { initialEntries = ["/"] }: { initialEntries?: string[] } = {},
) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
    </HelmetProvider>,
  );
