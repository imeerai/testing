"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useChat } from "@/contexts/chat-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { LoadingBar } from "@/components/loading-bar"
import { Send, ArrowLeft, Phone, Video, MoreVertical, Circle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface ChatUser {
  id: string
  firstName: string
  lastName: string
  role: string
  profile?: {
    photo: string
    company: string
    isActive: boolean
  }
}

export default function ChatPage({ params }: { params: { userId: string } }) {
  const { user } = useAuth()
  const { sendMessage, getMessagesForChat, isUserOnline } = useChat()
  const router = useRouter()
  const { toast } = useToast()
  const [newMessage, setNewMessage] = useState("")
  const [chatUser, setChatUser] = useState<ChatUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const messages = getMessagesForChat(params.userId)
  const isOnline = isUserOnline(params.userId)

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin")
      return
    }

    const loadChatData = async () => {
      try {
        // Demo users
        const demoUsers = [
          {
            id: "1",
            firstName: "Laiba",
            lastName: "Rafique",
            role: "investor",
            profile: {
              photo: "/placeholder.svg?height=100&width=100",
              company: "Rafique Ventures",
              isActive: true,
            },
          },
          {
            id: "2",
            firstName: "Alia",
            lastName: "Jafar",
            role: "entrepreneur",
            profile: {
              photo: "/placeholder.svg?height=100&width=100",
              company: "TechStart Inc",
              isActive: true,
            },
          },
          {
            id: "4",
            firstName: "Manahil",
            lastName: "Yousf",
            role: "investor",
            profile: {
              photo: "/placeholder.svg?height=100&width=100",
              company: "Yousf Capital",
              isActive: true,
            },
          },
          {
            id: "5",
            firstName: "Fatima",
            lastName: "Ali",
            role: "entrepreneur",
            profile: {
              photo: "/placeholder.svg?height=100&width=100",
              company: "EcoSolutions",
              isActive: true,
            },
          },
        ]

        const foundUser = demoUsers.find((u) => u.id === params.userId)
        setChatUser(foundUser || null)
      } catch (error) {
        console.error("Error loading chat data:", error)
        toast({
          title: "Error",
          description: "Failed to load chat data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadChatData()
  }, [user, params.userId, router, toast])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    if (newMessage.length > 0) {
      setIsTyping(true)
      const timer = setTimeout(() => setIsTyping(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [newMessage])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user) return

    sendMessage(params.userId, newMessage.trim())
    setNewMessage("")

    toast({
      title: "Message Sent! 💬",
      description: "Your message has been delivered successfully!",
    })
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return "✓"
      case "delivered":
        return "✓✓"
      case "read":
        return <span className="text-blue-400">✓✓</span>
      default:
        return ""
    }
  }

  if (!user || isLoading) {
    return <LoadingBar />
  }

  if (!chatUser) {
    return (
      <div className="min-h-screen dashboard-bg">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">User not found</h3>
              <p className="text-muted-foreground mb-4">The user you're trying to chat with doesn't exist.</p>
              <Button asChild className="btn-gradient">
                <Link href={`/dashboard/${user.role}`}>Back to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dashboard-bg">
      <LoadingBar />
      <Navbar />

      <div className="container mx-auto px-4 py-4">
        <Card className="h-[calc(100vh-12rem)] flex flex-col glass-card shadow-2xl animate-fade-in-up">
          {/* Chat Header */}
          <CardHeader className="flex flex-row items-center space-y-0 pb-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
            <Button asChild variant="ghost" size="sm" className="mr-4 hover:bg-purple-500/10">
              <Link href={`/dashboard/${user.role}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>

            <div className="flex items-center space-x-4 flex-1">
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-purple-400/30">
                  <AvatarImage src={chatUser.profile?.photo || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-cyan-400 text-white">
                    {chatUser.firstName[0]}
                    {chatUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-background rounded-full status-online"></div>
                )}
              </div>
              <div>
                <CardTitle className="text-lg">
                  {chatUser.firstName} {chatUser.lastName}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs border-purple-400/20 text-purple-400">
                    {chatUser.role}
                  </Badge>
                  {isOnline ? (
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/20 text-xs">
                      <Circle className="h-2 w-2 mr-1 fill-current" />
                      Online
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">Last seen 2h ago</span>
                  )}
                </div>
                {chatUser.profile?.company && (
                  <p className="text-sm text-muted-foreground">{chatUser.profile.company}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300 hover:bg-green-400/10">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-purple-500/10">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
                <p className="text-muted-foreground">
                  Send a message to begin your business discussion with {chatUser.firstName}
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user.id ? "justify-end" : "justify-start"} chat-bubble`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-lg ${
                        message.senderId === user.id
                          ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white ml-12"
                          : "glass-card mr-12"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.message}</p>
                      <div
                        className={`flex items-center justify-between mt-2 text-xs ${
                          message.senderId === user.id ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        <span>{formatTime(message.timestamp)}</span>
                        {message.senderId === user.id && (
                          <span className="ml-2">{getMessageStatusIcon(message.status)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="glass-card rounded-2xl px-4 py-3 mr-12">
                      <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Message Input */}
          <div className="border-t border-purple-500/20 p-4 bg-gradient-to-r from-purple-500/5 to-cyan-500/5">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <Input
                placeholder={`Message ${chatUser.firstName}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 rounded-full border-2 border-purple-500/20 focus:border-purple-400 bg-background/50"
              />
              <Button type="submit" size="sm" disabled={!newMessage.trim()} className="rounded-full px-6 btn-gradient">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send • Be professional and respectful • Real-time messaging enabled
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
