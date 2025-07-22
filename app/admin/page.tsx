"use client"

import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/navbar"
import { LoadingBar } from "@/components/loading-bar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, AlertTriangle, CheckCircle, Mail, Phone, Building, DollarSign } from "lucide-react"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  contact: string
  isProfileComplete: boolean
  profile?: any
}

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  status: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin")
      return
    }

    if (user.role !== "admin") {
      router.push("/")
      return
    }

    // Load data
    const loadData = async () => {
      try {
        const [usersResponse, contactsResponse] = await Promise.all([
          fetch("/data/users.json"),
          fetch("/data/contacts.json"),
        ])

        const usersData = await usersResponse.json()
        const contactsData = await contactsResponse.json()

        setUsers(usersData.users.filter((u: any) => u.role !== "admin"))
        setContacts(contactsData.contacts)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user, router])

  const stats = {
    totalUsers: users.length,
    investors: users.filter((u) => u.role === "investor").length,
    entrepreneurs: users.filter((u) => u.role === "entrepreneur").length,
    activeUsers: users.filter((u) => u.profile?.isActive).length,
    pendingContacts: contacts.filter((c) => c.status === "new").length,
  }

  if (!user || user.role !== "admin") {
    return <LoadingBar />
  }

  return (
    <div className="min-h-screen bg-background">
      <LoadingBar />
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, monitor activity, and oversee platform operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investors</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.investors}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entrepreneurs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.entrepreneurs}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Contacts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingContacts}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users Management</TabsTrigger>
            <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
            <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all registered users, their profiles, and account status</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg animate-pulse">
                        <div className="w-12 h-12 bg-muted rounded-full" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-1/4" />
                          <div className="h-3 bg-muted rounded w-1/3" />
                        </div>
                        <div className="w-20 h-8 bg-muted rounded" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={user.profile?.photo || "/placeholder.svg"} />
                            <AvatarFallback>
                              {user.firstName[0]}
                              {user.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {user.firstName} {user.lastName}
                            </p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              <span>{user.email}</span>
                              <Phone className="h-3 w-3 ml-2" />
                              <span>{user.contact}</span>
                            </div>
                            {user.profile?.company && (
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Building className="h-3 w-3" />
                                <span>{user.profile.company}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge variant={user.role === "investor" ? "default" : "secondary"}>{user.role}</Badge>
                          <Badge variant={user.isProfileComplete ? "default" : "destructive"}>
                            {user.isProfileComplete ? "Complete" : "Incomplete"}
                          </Badge>
                          <Badge variant={user.profile?.isActive ? "default" : "secondary"}>
                            {user.profile?.isActive ? "Active" : "Inactive"}
                          </Badge>

                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="destructive">
                              Block
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>Review and respond to contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={contact.status === "new" ? "destructive" : "default"}>{contact.status}</Badge>
                          <span className="text-sm text-muted-foreground">{contact.date}</span>
                        </div>
                      </div>
                      <p className="font-medium mb-2">{contact.subject}</p>
                      <p className="text-sm text-muted-foreground mb-4">{contact.message}</p>
                      <div className="flex space-x-2">
                        <Button size="sm">Reply</Button>
                        <Button size="sm" variant="outline">
                          Mark as Resolved
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Recent user registrations and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>New registrations this week</span>
                      <Badge>12</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Active conversations</span>
                      <Badge>8</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Profile completions</span>
                      <Badge>15</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                  <CardDescription>System status and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>System Status</span>
                      <Badge variant="default" className="bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Healthy
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Active Sessions</span>
                      <Badge>24</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Response Time</span>
                      <Badge variant="secondary">120ms</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
