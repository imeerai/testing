"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Loader2, Camera, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfileSetup() {
  const { user, updateProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    photo: "/placeholder.svg?height=100&width=100",
    company: "",
    addressTemporary: "",
    addressPermanent: "",
    phone: user?.contact || "",
    experience: "",
    field: "",
    description: "",
    title: "",
    terms: "",
    bio: "",
    startupDescription: "",
    fundingNeed: "",
    pitchDeck: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = () => {
    // Simulate photo upload with different photos
    const photos = [
      "/placeholder.svg?height=100&width=100&text=👤",
      "/placeholder.svg?height=100&width=100&text=🧑‍💼",
      "/placeholder.svg?height=100&width=100&text=👩‍💻",
      "/placeholder.svg?height=100&width=100&text=🧑‍🚀",
      "/placeholder.svg?height=100&width=100&text=👨‍💼",
    ]
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)]
    setProfileData((prev) => ({ ...prev, photo: randomPhoto }))

    toast({
      title: "Photo Updated! 📸",
      description: "Profile photo has been updated successfully!",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = await updateProfile(profileData)
    if (success) {
      setTimeout(() => {
        router.push(`/dashboard/${user?.role}`)
      }, 1500)
    }
    setIsLoading(false)
  }

  if (!user) {
    router.push("/auth/signin")
    return null
  }

  return (
    <div className="min-h-screen dashboard-bg">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card shadow-2xl animate-fade-in-up">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-4xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                Complete Your Profile
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {user.role === "investor"
                  ? "Set up your investor profile to start connecting with entrepreneurs"
                  : "Set up your entrepreneur profile to start connecting with investors"}
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-8">
                {/* Profile Photo Section */}
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative profile-upload" onClick={handlePhotoUpload}>
                    <Avatar className="w-32 h-32 border-4 border-purple-400/30 shadow-lg">
                      <AvatarImage src={profileData.photo || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-cyan-400 text-white">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 btn-gradient shadow-lg"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePhotoUpload}
                    className="border-purple-400/20 text-purple-400 hover:bg-purple-400/10 bg-transparent"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Photo
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Click on the avatar or button above to change your profile photo
                  </p>
                </div>

                {/* Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium">
                      Company/Organization *
                    </Label>
                    <Input
                      id="company"
                      placeholder={user.role === "investor" ? "Investment Firm" : "Startup Name"}
                      value={profileData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="bg-background/50 border-purple-500/20 focus:border-purple-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+92-318-222-1234"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-background/50 border-purple-500/20 focus:border-purple-400"
                      required
                    />
                  </div>
                </div>

                {user.role === "investor" ? (
                  // Investor-specific fields
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="addressTemporary" className="text-sm font-medium">
                          Business Address *
                        </Label>
                        <Input
                          id="addressTemporary"
                          placeholder="123 Business St, LHR"
                          value={profileData.addressTemporary}
                          onChange={(e) => handleInputChange("addressTemporary", e.target.value)}
                          className="bg-background/50 border-purple-500/20 focus:border-purple-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="addressPermanent" className="text-sm font-medium">
                          Home Address *
                        </Label>
                        <Input
                          id="addressPermanent"
                          placeholder="456 Home Ave, LHR"
                          value={profileData.addressPermanent}
                          onChange={(e) => handleInputChange("addressPermanent", e.target.value)}
                          className="bg-background/50 border-purple-500/20 focus:border-purple-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium">
                        Professional Title *
                      </Label>
                      <Input
                        id="title"
                        placeholder="e.g., Senior Partner, Managing Director"
                        value={profileData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="bg-background/50 border-purple-500/20 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="field" className="text-sm font-medium">
                        Investment Fields *
                      </Label>
                      <Input
                        id="field"
                        placeholder="e.g., Technology, Healthcare, Fintech"
                        value={profileData.field}
                        onChange={(e) => handleInputChange("field", e.target.value)}
                        className="bg-background/50 border-purple-500/20 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-sm font-medium">
                        Experience *
                      </Label>
                      <Textarea
                        id="experience"
                        placeholder="Describe your investment experience..."
                        value={profileData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        className="min-h-[100px] bg-background/50 border-purple-500/20 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        About You *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Tell entrepreneurs about yourself and your investment approach..."
                        value={profileData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="min-h-[120px] bg-background/50 border-purple-500/20 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="terms" className="text-sm font-medium">
                        Investment Terms & Conditions *
                      </Label>
                      <Textarea
                        id="terms"
                        placeholder="Describe your investment terms, minimum amounts, expected returns, etc."
                        value={profileData.terms}
                        onChange={(e) => handleInputChange("terms", e.target.value)}
                        className="min-h-[120px] bg-background/50 border-purple-500/20 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  // Entrepreneur-specific fields
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-medium">
                        Bio *
                      </Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell investors about yourself and your background..."
                        value={profileData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        className="min-h-[100px] bg-background/50 border-purple-500/20 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startupDescription" className="text-sm font-medium">
                        Startup Description *
                      </Label>
                      <Textarea
                        id="startupDescription"
                        placeholder="Describe your startup, product, and business model..."
                        value={profileData.startupDescription}
                        onChange={(e) => handleInputChange("startupDescription", e.target.value)}
                        className="min-h-[120px] bg-background/50 border-purple-500/20 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fundingNeed" className="text-sm font-medium">
                          Funding Need *
                        </Label>
                        <Input
                          id="fundingNeed"
                          placeholder="e.g., $500,000"
                          value={profileData.fundingNeed}
                          onChange={(e) => handleInputChange("fundingNeed", e.target.value)}
                          className="bg-background/50 border-purple-500/20 focus:border-purple-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pitchDeck" className="text-sm font-medium">
                          Pitch Deck *
                        </Label>
                        <Input
                          id="pitchDeck"
                          placeholder="Link to pitch deck or 'Available upon request'"
                          value={profileData.pitchDeck}
                          onChange={(e) => handleInputChange("pitchDeck", e.target.value)}
                          className="bg-background/50 border-purple-500/20 focus:border-purple-400"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-8">
                  <Button type="submit" className="w-full h-14 text-lg btn-gradient shadow-lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Saving Profile...
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-5 w-5" />
                        Complete Profile & Continue
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
