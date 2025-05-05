import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import ChatBox from "./ChatBox";

jest.mock("@/lib/functions/newChat", () => ({
  default: jest.fn(() => Promise.resolve({ success: true })),
}));

describe("ChatBox", () => {
  it("should render correctly", () => {
    const { container } = render(<ChatBox />);
    expect(container).toBeTruthy();
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(<ChatBox />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should have the correct elements in the component", () => {
    render(<ChatBox />);

    const textarea = screen.getByRole("textbox");
    const logoLight = screen.getByAltText("LawConnect Logo");
    const disclaimerText = screen.getByText(
      "Our service provides general legal information, not legal advice. Consult a lawyer for personalized assistance."
    );

    expect(textarea).toBeInTheDocument();
    expect(logoLight).toBeInTheDocument();
    expect(disclaimerText).toBeInTheDocument();
  });
});
