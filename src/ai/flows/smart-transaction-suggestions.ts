// src/ai/flows/smart-transaction-suggestions.ts
'use server';

/**
 * @fileOverview Provides smart suggestions for transactions based on user behavior.
 *
 * - getSmartSuggestions - A function that retrieves smart transaction suggestions for a user.
 * - SmartSuggestionsInput - The input type for the getSmartSuggestions function.
 * - SmartSuggestionsOutput - The return type for the getSmartSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSuggestionsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  recentTransactions: z.array(z.object({
    transactionType: z.string().describe('The type of transaction (e.g., payment, recharge, transfer).'),
    merchantName: z.string().optional().describe('The name of the merchant (if applicable).'),
    amount: z.number().describe('The amount of the transaction.'),
    timestamp: z.string().describe('The timestamp of the transaction.'),
  })).describe('A list of the user\'s recent transactions.'),
});
export type SmartSuggestionsInput = z.infer<typeof SmartSuggestionsInputSchema>;

const SmartSuggestionsOutputSchema = z.object({
  suggestedTransactions: z.array(z.object({
    transactionType: z.string().describe('The type of transaction suggested.'),
    merchantName: z.string().optional().describe('The name of the merchant (if applicable).'),
    amount: z.number().optional().describe('The suggested amount.'),
    description: z.string().describe('A description of why this transaction is suggested.'),
  })).describe('A list of suggested transactions for the user.'),
});
export type SmartSuggestionsOutput = z.infer<typeof SmartSuggestionsOutputSchema>;

export async function getSmartSuggestions(input: SmartSuggestionsInput): Promise<SmartSuggestionsOutput> {
  return smartSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSuggestionsPrompt',
  input: {schema: SmartSuggestionsInputSchema},
  output: {schema: SmartSuggestionsOutputSchema},
  prompt: `You are a personal finance assistant that analyzes user transaction history and provides smart suggestions for future transactions.

  Analyze the following recent transactions for user ID {{{userId}}}:

  {{#each recentTransactions}}
  - Type: {{transactionType}}, Merchant: {{merchantName}}, Amount: {{amount}}, Timestamp: {{timestamp}}
  {{/each}}

  Based on this transaction history, suggest up to 3 relevant transactions that the user might want to make. Include the transaction type, merchant name (if applicable), suggested amount, and a brief description of why the transaction is suggested.

  Ensure that all output fields conform to the schema description. Adhere to the specified schema strictly.
  `,
});

const smartSuggestionsFlow = ai.defineFlow(
  {
    name: 'smartSuggestionsFlow',
    inputSchema: SmartSuggestionsInputSchema,
    outputSchema: SmartSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
