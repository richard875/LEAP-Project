import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import AnswerPill from "./AnswerPill";

describe("AnswerPill", () => {
  it("should render correctly", () => {
    const { container } = render(<AnswerPill />);
    expect(container).toBeTruthy();
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(<AnswerPill />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should have the correct elements in the component", () => {
    render(<AnswerPill />);
    const logoLight = screen.getByAltText("LawConnect Logo");
    const companyName = screen.getByText("LawConnect");

    expect(logoLight).toBeInTheDocument();
    expect(companyName).toBeInTheDocument();
  });
});
