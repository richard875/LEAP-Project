"use client";

import { useEffect, useContext } from "react";
import ConversationItem from "@/types/conversationItem";
import ConversationType from "@/enums/conversationType";
import ConversationContext from "@/context/conversationContext";

const mockQuestionText =
  "I am an accountant, and my client is asking for advice on strategies to optimise his tax structure. He and his partner have an income of $200,000 per year. They live in Sydney, Australia, and have no kids. Please provide a detailed list of strategies that could minimise their tax. Please be very specific and use concise language.";

const mockAnswerText = `- **Salary Sacrifice into Superannuation**  
  Encourage your client to make salary sacrifice contributions to their superannuation fund. These are taxed at 15%, which is lower than their marginal tax rate. The current cap is $27,500 per person per year, including employer contributions.

- **Spouse Superannuation Contributions**  
  If one partner earns significantly less, the higher-income partner can contribute up to $3,000 to their spouse's superannuation and receive a tax offset of up to $540.

- **Negative Gearing on Investment Property**  
  If they own an investment property or plan to purchase one, the interest on the loan and associated expenses can be claimed as a deduction. If the property is negatively geared (i.e., rental income is less than the expenses), it can reduce taxable income.`;

const useMockConversation = () => {
  const context = useContext(ConversationContext);

  useEffect(() => {
    if (!context) return;

    const mockQuestion: ConversationItem = {
      id: "22be67e6-8832-4580-a300-e9bbc8b96078",
      date: new Date(),
      content: mockQuestionText,
      type: ConversationType.Question,
    };

    const mockAnswer: ConversationItem = {
      id: "e70ecc41-8ad1-4fc2-a55b-49f8afe55497",
      date: new Date(new Date().getTime() + 5000),
      content: mockAnswerText,
      type: ConversationType.Answer,
    };

    context.setConversation([mockQuestion, mockAnswer]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const MockConversation = () => {
  useMockConversation();

  return null;
};

export default MockConversation;
