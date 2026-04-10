import { act, fireEvent, screen } from "@testing-library/react";
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

  it("keeps the custom loading overlay visible after the iframe first loads", () => {
    vi.useFakeTimers();

    renderWithPageProviders(<BookACall />, { route: "/book-a-call" });

    const iframe = screen.getByTitle("Book a Strategy Call");

    expect(screen.getByText(/Loading the live booking calendar/i)).toBeInTheDocument();

    fireEvent.load(iframe);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText(/Loading the live booking calendar/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.queryByText(/Loading the live booking calendar/i)).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
