"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./auth-context"

interface Message {
  id: string
  senderId: string
  receiverId: string
  message: string
  timestamp: string
  status: "sent" | "delivered" | "read"
}

interface ChatContextType {
  messages: Message[]
  sendMessage: (receiverId: string, message: string) => void
  markAsRead: (chatId: string) => void
  getMessagesForChat: (userId: string) => Message[]
  isUserOnline: (userId: string) => boolean
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set())

  // Simulate real-time messaging
  useEffect(() => {
    // Load initial messages
    const initialMessages: Message[] = [
      {
        id: "1",
        senderId: "1",
        receiverId: "2",
        message: "Hi laiba! I'm interested in learning more about your AI platform.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: "read",
      },
      {
        id: "2",
        senderId: "2",
        receiverId: "1",
        message: "Hello manahil! I'd be happy to discuss this with you. When would be a good time for a call?",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: "read",
      },
      {
        id: "3",
        senderId: "4",
        receiverId: "5",
        message: "ayeshuu, your sustainable packaging solution looks promising. I'd like to learn more.",
        timestamp: new Date(Date.now() - 900000).toISOString(),
        status: "delivered",
      },
    ]
    setMessages(initialMessages)

    // Simulate online users
    const simulateOnlineUsers = () => {
      const allUsers = ["1", "2", "4", "5", "6", "7", "8", "9"]
      const randomOnlineUsers = allUsers.filter(() => Math.random() > 0.3)
      setOnlineUsers(new Set(randomOnlineUsers))
    }

    simulateOnlineUsers()
    const interval = setInterval(simulateOnlineUsers, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const sendMessage = (receiverId: string, message: string) => {
    if (!user) return

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId,
      message,
      timestamp: new Date().toISOString(),
      status: "sent",
    }

    setMessages((prev) => [...prev, newMessage])

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))
    }, 1000)

    // Simulate auto-reply for demo
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: receiverId,
        receiverId: user.id,
        message: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date().toISOString(),
        status: "sent",
      }

      setMessages((prev) => [...prev, autoReply])
    }, 3000)
  }

  const markAsRead = (chatId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === chatId ? { ...msg, status: "read" } : msg)))
  }

  const getMessagesForChat = (userId: string) => {
    if (!user) return []
    return messages.filter(
      (msg) =>
        (msg.senderId === user.id && msg.receiverId === userId) ||
        (msg.senderId === userId && msg.receiverId === user.id),
    )
  }

  const isUserOnline = (userId: string) => {
    return onlineUsers.has(userId)
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        markAsRead,
        getMessagesForChat,
        isUserOnline,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
