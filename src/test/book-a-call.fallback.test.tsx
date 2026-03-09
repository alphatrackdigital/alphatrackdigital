import { act, screen } from "@testing-library/react";
import BookACall from "@/pages/BookACall";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("BookACall fallback", () => {
  it("shows fallback options when the scheduler iframe does not load", () => {
    vi.useFakeTimers();

    renderWithPageProviders(<BookACall />, { route: "/book-a-call" });

    expect(screen.queryByText(/Having trouble with the embedded scheduler/i)).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5600);
    });

    expect(screen.getByText(/Having trouble with the embedded scheduler/i)).toBeInTheDocument();

    vi.useRealTimers();
  });
});
