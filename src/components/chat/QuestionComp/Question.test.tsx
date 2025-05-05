import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import ConversationType from "@/enums/conversationType";
import ConversationItem from "@/types/conversationItem";

import Question from "./Question";

jest.mock("@/lib/functions/deleteChat", () => ({
  default: jest.fn(() => Promise.resolve({ success: true })),
}));

jest.mock("@/lib/functions/editChat", () => ({
  default: jest.fn(() => Promise.resolve({ success: true })),
}));

describe("Question", () => {
  const question: ConversationItem = {
    id: "2e43e472-8b02-45f3-866c-4943dee1ac97",
    date: new Date(),
    content: "What is the capital of France?",
    type: ConversationType.Question,
  };

  it("should render correctly", () => {
    const { container } = render(
      <Question question={question} isFirst={false} />
    );
    expect(container).toBeTruthy();
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(
      <Question question={question} isFirst={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should have the correct elements in the component", () => {
    render(<Question question={question} isFirst={false} />);
    const questionText = screen.getByText(question.content);

    expect(questionText).toBeInTheDocument();
  });
});
