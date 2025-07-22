import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Target, Shield, TrendingUp, Award, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-4">
              About Business Nexus
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Connecting Innovation with Investment</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We're building the future of business networking by creating meaningful connections between ambitious
              entrepreneurs and strategic investors worldwide.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="animate-slide-in">
            <CardHeader>
              <Target className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To democratize access to investment opportunities and entrepreneurial talent by creating a trusted
                platform where innovation meets capital. We believe every great idea deserves the chance to flourish
                with the right support and funding.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-in">
            <CardHeader>
              <Globe className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become the world's leading platform for business partnerships, fostering a global ecosystem where
                entrepreneurs and investors collaborate to solve the world's most pressing challenges and create lasting
                value.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Trust & Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We maintain the highest standards of integrity, ensuring all users can trust the platform and the
                  connections they make.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our community of entrepreneurs and investors is at the heart of everything we do. We prioritize their
                  success and growth.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Innovation & Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We continuously innovate our platform and services to better serve our users and facilitate meaningful
                  business growth.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted/50 rounded-lg mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-muted-foreground">Numbers that tell our story</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$100M+</div>
              <p className="text-muted-foreground">Funding Facilitated</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Successful Partnerships</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Countries Served</p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">The people behind Business Nexus</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <CardTitle>Laiba Rafique</CardTitle>
                <CardDescription>CEO & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Former investment banker with 15 years of experience in venture capital and startup ecosystems.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <CardTitle>Alia Jafar</CardTitle>
                <CardDescription>CTO & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tech entrepreneur and software architect with expertise in building scalable platforms and AI systems.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
                <CardTitle>Manahil Yousf</CardTitle>
                <CardDescription>Head of Partnerships</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Business development expert with a track record of building strategic partnerships in the fintech
                  space.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recognition */}
        <section className="text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recognition & Awards</h2>
            <p className="text-xl text-muted-foreground">Honored to be recognized by industry leaders</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Best Fintech Platform 2025</CardTitle>
                <CardDescription>TechCrunch Awards</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Innovation in Business Networking</CardTitle>
                <CardDescription>Forbes 30 Under 30</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Top Startup Platform</CardTitle>
                <CardDescription>Entrepreneur Magazine</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
