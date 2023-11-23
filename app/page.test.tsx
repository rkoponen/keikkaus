/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Home from "./page";

it("Has a link to lotto page", () => {
  render(<Home />);
  const link = screen.getByRole("link", { name: "Lotto" });
  expect(link).toBeInTheDocument();
});
