"use client";

import { useChat } from "@ai-sdk/react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, X, Minimize2, Maximize2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function Chatbot() {
    // @ts-ignore
    const { messages, input, handleInputChange, handleSubmit, isLoading } =
        useChat({
            onError: (error) => {
                console.error("Chat Error:", error);
                alert("حدث خطأ في المحادثة. يرجى المحاولة مرة أخرى.");
            },
        });
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen, isMinimized]);

    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50 p-0"
                size="icon"
            >
                <MessageSquare className="h-6 w-6" />
                <span className="sr-only">Open Chat</span>
            </Button>
        );
    }

    return (
        <Card
            className={cn(
                "fixed right-4 z-50 transition-all duration-300 shadow-xl border-primary/20",
                isMinimized
                    ? "bottom-4 w-72 h-14"
                    : "bottom-4 w-80 sm:w-96 h-[500px] flex flex-col"
            )}
        >
            <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0 bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    AI Assistant
                </CardTitle>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-primary-foreground/20 text-primary-foreground"
                        onClick={() => setIsMinimized(!isMinimized)}
                    >
                        {isMinimized ? (
                            <Maximize2 className="h-3 w-3" />
                        ) : (
                            <Minimize2 className="h-3 w-3" />
                        )}
                        <span className="sr-only">
                            {isMinimized ? "Maximize" : "Minimize"}
                        </span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-primary-foreground/20 text-primary-foreground"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>
            </CardHeader>

            {!isMinimized && (
                <>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full p-4" ref={scrollRef}>
                            <div className="flex flex-col gap-4 min-h-full">
                                {messages.length === 0 && (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-4 mt-10">
                                        <MessageSquare className="h-10 w-10 mb-2 opacity-20" />
                                        <p className="text-sm">
                                            Hi! I'm your AI assistant. How can I help you today?
                                        </p>
                                    </div>
                                )}
                                {messages.map((m: any) => (
                                    <div
                                        key={m.id}
                                        className={cn(
                                            "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                            m.role === "user"
                                                ? "ml-auto bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        )}
                                    >
                                        {m.content}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
                                        <div className="flex gap-1 items-center h-5">
                                            <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-3 pt-0">
                        <form
                            onSubmit={handleSubmit}
                            className="flex w-full items-center gap-2"
                        >
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                                className="flex-1"
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input}>
                                <Send className="h-4 w-4 rtl:rotate-180" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </CardFooter>
                </>
            )}
        </Card>
    );
}
