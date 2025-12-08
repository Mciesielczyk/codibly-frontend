// src/tests/OptimalWindow.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OptimalWindow from "../pages/OptimalWindow";

describe("OptimalWindow component", () => {
  beforeEach(() => {
    // mock fetch globalnie przed każdym testem
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            startDateTime: "2025-12-10T02:00Z",
            endDateTime: "2025-12-10T05:00Z",
            averageCleanEnergy: 80.5667,
          }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks(); // resetuje mocki po każdym teście
  });

  it("renders input and button", () => {
    render(<OptimalWindow />);
    expect(screen.getByLabelText(/Czas ładowania/i)).toBeInTheDocument();
    expect(screen.getByText(/Sprawdź/i)).toBeInTheDocument();
  });

  it("fetches and displays data after clicking button", async () => {
    render(<OptimalWindow />);

    // klikamy przycisk "Sprawdź", żeby wywołać fetch
    fireEvent.click(screen.getByText(/Sprawdź/i));

    // poczekaj aż wynik pojawi się w DOM
    await waitFor(() => {
      expect(
        screen.getByText(/Średni udział czystej energii/i)
      ).toBeInTheDocument();
    });

    // sprawdzenie dokładnej wartości
    expect(
      screen.getByText(/Średni udział czystej energii: 80.57%/i)
    ).toBeInTheDocument();

    // sprawdzenie dat rozpoczęcia i zakończenia
    expect(screen.getByText(/Rozpoczęcie:/i)).toBeInTheDocument();
    expect(screen.getByText(/Zakończenie:/i)).toBeInTheDocument();
  });
});
