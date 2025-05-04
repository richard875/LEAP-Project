import { render } from "@testing-library/react";

import "@testing-library/jest-dom";
import AnswerSkeleton from "./AnswerSkeleton";

describe("AnswerSkeleton", () => {
  it("should render correctly", () => {
    const { container } = render(<AnswerSkeleton />);
    expect(container).toBeTruthy();
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(<AnswerSkeleton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
