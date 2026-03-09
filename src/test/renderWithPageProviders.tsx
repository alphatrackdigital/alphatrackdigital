import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

type RenderWithPageProvidersOptions = {
  route?: string;
};

export const renderWithPageProviders = (
  ui: ReactElement,
  { route = "/" }: RenderWithPageProvidersOptions = {},
) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </HelmetProvider>,
  );
