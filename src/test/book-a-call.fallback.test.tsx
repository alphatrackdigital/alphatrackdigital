import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookACall from "@/pages/BookACall";

describe("BookACall fallback", () => {
  it("shows fallback options when the scheduler iframe does not load", () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter>
        <BookACall />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/Having trouble with the embedded scheduler/i)).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5600);
    });

    expect(screen.getByText(/Having trouble with the embedded scheduler/i)).toBeInTheDocument();

    vi.useRealTimers();
  });
});
