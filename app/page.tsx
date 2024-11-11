"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Settings, Plus, Menu, X } from "lucide-react";
import { useChat } from "ai/react";

type Message = {
  id: string;
  content: string;
  role: "assistant" | "user";
};

type Contact = {
  id: number;
  name: string;
  avatar: string;
};

export default function Home() {
  const {
    append,
    isLoading,
    input,
    messages,
    handleInputChange,
    handleSubmit,
  } = useChat();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 border-r flex flex-col absolute md:relative z-10 bg-background`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Chats</h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
          <div className="relative">
            {/* <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" /> */}
          </div>
        </div>
        <ScrollArea className="flex-1"></ScrollArea>
        <div className="p-4 border-t flex justify-between"></div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold">Poke AI Assistant</h2>
          <div className="w-8 md:hidden" />{" "}
          {/* Spacer for mobile layout balance */}
        </div>
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`flex items-start max-w-[70%] ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {message.role === "user" ? "U" : "B"}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`mx-2 py-2 px-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex space-x-2"
          >
            <Input
              placeholder="Ask me a Pokemon related question..."
              value={input}
              onChange={handleInputChange}
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
