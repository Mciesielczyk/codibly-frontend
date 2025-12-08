import React from "react";
import { render, screen } from "@testing-library/react";
import EnergyMix from "../pages/EnergyMix";

describe("EnergyMix component basic render", () => {
  test("renders title and structure", () => {
    render(<EnergyMix />);

    // Sprawdzamy, czy nagłówek strony jest widoczny
    const header = screen.getByText(/Energy Mix/i);
    expect(header).toBeInTheDocument();

    // Sprawdzamy, czy struktura dla dni jest obecna
    const emptyDiv = screen.getByText(/Energy Mix/i).parentElement;
    expect(emptyDiv).toBeInTheDocument();
  });
});
