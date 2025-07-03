'use client'

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, User, Loader2, AlertCircle } from 'lucide-react';
import { aiChatbotSupport, type AIChatbotSupportOutput } from '@/ai/flows/ai-chatbot-support';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    escalate?: boolean;
};

export default function SupportPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const response: AIChatbotSupportOutput = await aiChatbotSupport({ query: currentInput });
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response.response,
                sender: 'bot',
                escalate: response.escalateToHuman
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Sorry, I encountered an error. Please try again later.',
                sender: 'bot',
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">AI Support Chat</h1>
                <p className="text-muted-foreground">Get instant help with your questions.</p>
            </header>
            <Card className="flex-1 flex flex-col shadow-md">
                <CardContent className="p-0 flex-1 flex flex-col">
                    <ScrollArea className="flex-1 p-6" viewportRef={scrollAreaRef}>
                        <div className="space-y-6">
                            {messages.map(message => (
                                <div key={message.id} className={cn("flex items-start gap-4", message.sender === 'user' ? 'justify-end' : 'justify-start')}>
                                    {message.sender === 'bot' && (
                                        <Avatar>
                                            <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn("max-w-lg p-3 rounded-lg shadow-sm", message.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
                                        <p className="text-sm">{message.text}</p>
                                        {message.escalate && (
                                            <Alert variant="destructive" className="mt-3">
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertTitle>Escalation Required</AlertTitle>
                                                <AlertDescription className="text-xs">
                                                    Our support team will contact you shortly.
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                    {message.sender === 'user' && (
                                        <Avatar>
                                            <AvatarFallback><User /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-4 justify-start">
                                    <Avatar>
                                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
                                    </Avatar>
                                    <div className="max-w-md p-3 rounded-lg bg-muted flex items-center shadow-sm">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        <span className="text-sm">Thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <div className="p-4 border-t bg-background/50">
                        <div className="flex gap-2">
                            <Input 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                                disabled={isLoading}
                                className="h-11"
                            />
                            <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon" className="h-11 w-11 shrink-0">
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                                <span className="sr-only">Send</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
