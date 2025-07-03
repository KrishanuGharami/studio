'use server';

/**
 * @fileOverview This file defines an AI chatbot support flow that assists users with common queries, FAQs, or transaction issues.
 *
 * - aiChatbotSupport - A function that handles user queries and provides support.
 * - AIChatbotSupportInput - The input type for the aiChatbotSupport function.
 * - AIChatbotSupportOutput - The return type for the aiChatbotSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotSupportInputSchema = z.object({
  query: z.string().describe('The user query or question.'),
  transactionDetails: z.optional(z.string()).describe('Optional details about the transaction, if applicable.'),
});

export type AIChatbotSupportInput = z.infer<typeof AIChatbotSupportInputSchema>;

const AIChatbotSupportOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
  escalateToHuman: z.boolean().describe('Indicates whether the query should be escalated to a human support agent.'),
});

export type AIChatbotSupportOutput = z.infer<typeof AIChatbotSupportOutputSchema>;

export async function aiChatbotSupport(input: AIChatbotSupportInput): Promise<AIChatbotSupportOutput> {
  return aiChatbotSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotSupportPrompt',
  input: {schema: AIChatbotSupportInputSchema},
  output: {schema: AIChatbotSupportOutputSchema},
  prompt: `You are a helpful AI chatbot providing support for a payment application.
  Your goal is to answer user queries related to common questions, FAQs, and transaction issues.
  If you cannot resolve the issue or if it requires human intervention, set the escalateToHuman field to true.

  User Query: {{{query}}}
  {{#if transactionDetails}}
  Transaction Details: {{{transactionDetails}}}
  {{/if}}

  Response Guidelines:
  - Provide clear and concise answers.
  - If the query is about a specific transaction, use the provided transaction details to assist the user.
  - If the query cannot be resolved, set escalateToHuman to true and provide instructions on how to contact human support.
  - Always be polite and professional.
  `,
});

const aiChatbotSupportFlow = ai.defineFlow(
  {
    name: 'aiChatbotSupportFlow',
    inputSchema: AIChatbotSupportInputSchema,
    outputSchema: AIChatbotSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
