
'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AlertCircle, Bot, Loader2, RefreshCw, Send, User } from 'lucide-react';
import { getMentorResponse } from '@/app/(app)/mentor/actions';
import { useToast } from '@/hooks/use-toast';
import { cn, withTimeout } from '@/lib/utils';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  error?: boolean;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendToMentor = async (userMessageId: number, text: string) => {
    setIsLoading(true);

    try {
      const result = await withTimeout(getMentorResponse(text));

      if (result.success && result.answer) {
        const aiMessage: Message = { id: Date.now() + 1, text: result.answer, sender: 'ai' };
        setMessages((prev) => [
          ...prev.map((m) => (m.id === userMessageId ? { ...m, error: false } : m)),
          aiMessage,
        ]);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Could not get a response from the mentor.',
        });
        setMessages((prev) =>
          prev.map((m) => (m.id === userMessageId ? { ...m, error: true } : m))
        );
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Could not get a response from the mentor.',
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === userMessageId ? { ...m, error: true } : m))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    await sendToMentor(userMessage.id, userMessage.text);
  };

  const handleRetry = (message: Message) => {
    if (isLoading) return;
    sendToMentor(message.id, message.text);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-grow min-h-0 p-0">
        <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                    <Bot className="h-16 w-16 mb-4"/>
                    <p className="font-headline text-lg">Ask me anything!</p>
                    <p className="text-sm">e.g., &quot;How do I prepare for a technical interview?&quot;</p>
                </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-3',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
                <div className={cn('flex flex-col gap-1', message.sender === 'user' ? 'items-end' : 'items-start')}>
                  <div
                    className={cn(
                      'max-w-md rounded-lg p-3',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                  {message.error && (
                    <div className="flex items-center gap-2 text-xs text-destructive">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Failed to send</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto px-2 py-0.5 text-xs text-destructive hover:text-destructive"
                        onClick={() => handleRetry(message)}
                        disabled={isLoading}
                      >
                        <RefreshCw className="mr-1 h-3 w-3" />
                        Retry
                      </Button>
                    </div>
                  )}
                </div>
                 {message.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
