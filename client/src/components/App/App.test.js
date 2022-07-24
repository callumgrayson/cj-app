import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders option buttons", () => {
  render(<App />);
  const buttons = screen.getAllByRole("button");
  expect(buttons.length).toBeGreaterThan(0);
});
