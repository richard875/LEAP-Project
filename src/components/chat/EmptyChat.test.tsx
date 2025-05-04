import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import EmptyChat from "./EmptyChat";

describe("EmptyChat", () => {
  it("should render correctly", () => {
    const { container } = render(<EmptyChat isEmpty />);
    expect(container).toBeTruthy();
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(<EmptyChat isEmpty />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly when isEmpty is true", () => {
    const { container } = render(<EmptyChat isEmpty />);

    const magicIcon = container.querySelector("svg");
    const emptyChatText = screen.getByText("Start a conversation below");

    expect(magicIcon).toBeInTheDocument();
    expect(emptyChatText).toBeInTheDocument();
  });

  it("should render correctly when isEmpty is false", () => {
    const { container } = render(<EmptyChat isEmpty={false} />);

    expect(container.innerHTML).toBe("");
    expect(
      screen.queryByText("Start a conversation below")
    ).not.toBeInTheDocument();
  });
});
