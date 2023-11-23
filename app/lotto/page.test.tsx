import {
  fireEvent,
  getAllByTestId,
  getAllByText,
  render,
  screen,
} from "@testing-library/react";
import LottoPage from "./page";

describe("LottoPage", () => {
  test("should render a grid with all numbers from 1 to 40", () => {
    render(<LottoPage />);

    for (let i = 1; i < 40; i++) {
      const number = screen.getByText(i.toString());
      expect(number).toBeInTheDocument();
    }
  });
  test("should add and display a new row when 7 numbers are selected", () => {
    render(<LottoPage />);
    for (let i = 1; i <= 7; i++) {
      // fireEvent.click(screen.getByText(i.toString()))
      fireEvent.click(screen.getByText(i.toString()));
    }
    expect(screen.getAllByTestId("selected-number")).toHaveLength(7);
  });
  test("should remove a row when delete button is pressed", () => {
    render(<LottoPage />);
    for (let i = 1; i <= 7; i++) {
      // fireEvent.click(screen.getByText(i.toString()))
      fireEvent.click(screen.getByText(i.toString()));
    }

    expect(screen.getAllByTestId("selected-number")).toHaveLength(7);

    const btn = screen.getByTestId("delete");
    fireEvent.click(btn);

    expect(screen.queryAllByTestId("selected-number")).toHaveLength(0);
  });
});
