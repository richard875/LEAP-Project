import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Misc from "./Misc";

describe("Misc", () => {
  it("should render correctly", () => {
    const { container } = render(<Misc />);
    expect(container).toBeTruthy();
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(<Misc />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should have the correct elements in the component", () => {
    render(<Misc />);
    const avatar = screen.getByText("RL");
    const logoLight = screen.getByAltText("LawConnect Logo");

    expect(avatar).toBeInTheDocument();
    expect(logoLight).toBeInTheDocument();
  });
});
