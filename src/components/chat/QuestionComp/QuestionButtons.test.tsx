import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import QuestionButtons from "./QuestionButtons";

describe("QuestionButtons", () => {
  it("should render correctly", () => {
    const { container } = render(
      <QuestionButtons
        editing={false}
        handleEdit={async () => {}}
        handleDelete={async () => {}}
      />
    );
    expect(container).toBeTruthy();
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(
      <QuestionButtons
        editing={false}
        handleEdit={async () => {}}
        handleDelete={async () => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should have the correct elements in the component", () => {
    render(
      <QuestionButtons
        editing={false}
        handleEdit={async () => {}}
        handleDelete={async () => {}}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });
});
